from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin
from django.db.models import Min, Max, Avg
from django.conf import settings
from django.core.mail import send_mail, EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags

from datetime import datetime
from cacheops import cached_as

from backend.celery import app as celery_app
from detector.models import DetectorData

class SerializerMixin:
    '''Класс сериализатора в зависимости от action'''
    def get_serializer_class(self):
        try:
            return self.serializer_class_by_action[self.action]
        except KeyError:
            return self.serializer_class


class ListViewSet(SerializerMixin, GenericViewSet, ListModelMixin):
    '''Список'''
    pass

def slice_data_by_timestamp(queryset, begin_time, end_time, currency):
    res = list()
    i = 0
    time = datetime.now().date()
    while begin_time + currency*i <= end_time:
        date_sliced_queryset = queryset.filter(
            timestamp__gte=begin_time+currency*i,
            timestamp__lte=begin_time+currency*(i+1),
        )
        i += 1
        res.append(date_sliced_queryset)
    date_sliced_queryset = queryset.filter(
        timestamp__gte=begin_time+currency*i, 
        timestamp__lte=end_time
    )
    if date_sliced_queryset:
        res.append(date_sliced_queryset)

    return res

def queryset_mean(queryset, *args):
    
    def map_slicing_func(queryset, *args):
        if not queryset:
            DetectorData.objects.none()

        @cached_as(queryset, extra=list(*args))
        def _get_aggregation(queryset=queryset):
            return queryset.exclude(humidity=None, lightning=None, pH=None) \
                .aggregate(
                    mean_first_temp=Avg('temp'),
                    mean_humidity=Avg('humidity'),
                    mean_lightning=Avg('lightning'),
                    mean_pH=Avg('pH'),
                    min_timestamp=Min('timestamp'),
                    max_timestamp=Max('timestamp')
                )

        aggregated_data = _get_aggregation()

        return dict(
            temp = aggregated_data['mean_first_temp'],
            humidity = aggregated_data['mean_humidity'],
            lightning = aggregated_data['mean_lightning'],
            pH = aggregated_data['mean_pH'],
            min_timestamp = aggregated_data['min_timestamp'],
            max_timestamp = aggregated_data['max_timestamp'],
            timestamp = None
        )
    
    return list(map(map_slicing_func, queryset))

@celery_app.task
def send_report_email(user_email, date1, date2, content):
    title = f"Отчет за {date1.split('T')[0]} - {date2.split('T')[0]}"
    html_content = render_to_string(
        'report_template.html',
        {'title': title, 'content': content}
    )
    text_content = strip_tags(html_content)
    email = EmailMultiAlternatives(
        title,
        text_content,
        'Mars Berry Tracker',
        [user_email],
    )
    email.attach_alternative(html_content, 'text/html')
    email.send()

def make_content(data, begin_date, end_date, fl):
    if fl:
        content = ''
        for det in data:
            content += f'Теплица №{det.id}:\n'
            ph_perc = round(100*det.good_pH/7, 2)
            content += f'Данные по показателю кислотности: {ph_perc}% данных попали в диапазон лучших значений!\n'
            humidity_perc = round(100*det.good_humidity/7, 2)
            content += f'Данные по показателю влажности: {humidity_perc}% данных попали в диапазон лучших значений!\n'
            lightning_perc = round(100*det.good_lightning/7, 2)
            content += f'Данные по показателю освещение: {lightning_perc}% данных попали в диапазон лучших значений!\n'
            temp_perc = round(100*det.good_pH/7, 2)
            content += f'Данные по показателю температура: {temp_perc}% данных попали в диапазон лучших значений!\n\n'
            content += 'Рекомендации:\n'
            avg = det.data.filter(timestamp__gte=begin_date, timestamp__lt=end_date) \
                .aggregate(Avg('pH'), Avg('humidity'), Avg('lightning'), Avg('temp'))
            if avg['pH__avg'] is not None:
                if ph_perc < 85:
                    if float(avg['pH__avg']) < settings.NORMAL_PH:
                        content += f"Кислотность: {round(float(avg['pH__avg']), 2)} (Отклонение). Оптимальная кислотность: {settings.NORMAL_PH}.\n"
                    else:
                        content += f"Кислотность: {round(float(avg['pH__avg']), 2)} (Отклонение). Оптимальная кислотность: {settings.NORMAL_PH}.\n"
                else:
                    content += f"Кислотность: {round(float(avg['pH__avg']), 2)} (Норма)"
            else:
                content += "Необходим ремонт датчика.\n"
            if avg['humidity__avg'] is not None:
                if humidity_perc < 85:
                    if float(avg['humidity__avg']) < settings.NORMAL_LIGHTNING:
                        content += f"Влажность: {round(float(avg['humidity__avg']), 2)} (Отклонение). Оптимальная влажность: {settings.NORMAL_HUMIDITY}.\n"
                    else:
                        content += f"Влажность: {round(float(avg['humidity__avg']), 2)} (Отклонение). Оптимальная влажность: {settings.NORMAL_HUMIDITY}.\n"
                else:
                    content += f"Влажность {round(float(avg['humidity__avg']), 2)} (Норма)"
            else:
                content += "Необходим ремонт датчика.\n"
            if avg['lightning__avg'] is not None:
                if lightning_perc < 85:
                    if float(avg['lightning__avg']) < settings.NORMAL_LIGHTNING:
                        content += f"Освещенность: {round(float(avg['lightning__avg']), 2)} (Отклонение). Оптимальная освещенность: {settings.NORMAL_LIGHTNING}.\n"
                    else:
                        content += f"Освещенность: {round(float(avg['lightning__avg']), 2)} (Отклонение). Оптимальная освещенность: {settings.NORMAL_LIGHTNING}.\n"
                else: 
                    content += f"Освещенность {round(float(avg['humidity__avg']), 2)} (Норма)"
            else:
                content += "Необходим ремонт датчика.\n"
            if avg['temp__avg'] is not None:
                if temp_perc < 85:
                    if float(avg['temp__avg']) < settings.NORMAL_TEMP:
                        content += f"Температура: {round(float(avg['temp__avg']), 2)} (Отклонение). Оптимальная температура: {settings.NORMAL_TEMP}.\n"
                    else:
                        content += f"Температура: {round(float(avg['temp__avg']), 2)} (Отклонение). Оптимальная температура: {settings.NORMAL_TEMP}.\n"
            else:
                content += "Необходим ремонт датчика.\n"
            content += '\n\n'
    else:
        content = 'С Вашими теплицами все в полном порядке!\n Мы поддерживаем Ваши данные в пределах нормы.'
    return content