from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin
from django.db.models import Min, Max, Avg

from datetime import datetime
from cacheops import cached_as

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
        timestamp__lte=end_time,
    )
    res.append(date_sliced_queryset)

    return res

def queryset_mean(queryset, *args):
    
    def map_slicing_func(queryset, *args):
        if not queryset:
            DetectorData.objects.none()

        @cached_as(queryset, extra=list(*args))
        def _get_aggregation(queryset=queryset):
            return queryset \
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
            max_timestamp = aggregated_data['max_timestamp']
        )
    
    return list(map(map_slicing_func, queryset))