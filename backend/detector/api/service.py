from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin

class ListViewSet(GenericViewSet, ListModelMixin):
    '''Список'''
    pass


def slice_data_by_timestamp(queryset, begin_time, end_time):
    res = list()
    i = 0
    time = datetime.now().date()

    while begin_time + timedelta(days=i) <= end_time:
        date_sliced_queryset = queryset.filter(
            timestamp=min_timestamp+timedelta(days=i)
        )
        i += 1
        res.append(date_sliced_queryset)

    return res

def queryset_mean(queryset, detectors):

    def map_slicing_func(queryset, detectors=detectors):
        if not queryset:
            return

        @cached_as(queryset, extra=detectors)
        def _get_aggregation(queryset=queryset):
            return queryset \
                .aggregate(
                    mean_first_temp=Avg('first_temp'),
                    mean_second_temp =Avg('second_temp'),
                    mean_third_temp=Avg('third_temp'),
                    mean_humidity=Avg('humidity'),
                    mean_lightning=Avg('lightning'),
                    mean_pH=Avg('pH'),
                    mean_timestamp=Min('timestamp'),
                )

        aggregated_data = _get_aggregation()

        return dict(
            first_temp = aggregated_data['mean_first_temp'],
            second_temp = aggregated_data['mean_second_temp'],
            third_temp = aggregated_data['mean_third_temp'],
            humidity = aggregated_data['mean_humidity'],
            lightning = aggregated_data['mean_lightning'],
            pH = aggregated_data['mean_pH'],
            timestamp = aggregated_data['mean_timestamp'],
        )
    
    return list(map(map_slicing_func, queryset))