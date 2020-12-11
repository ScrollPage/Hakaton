from rest_framework.generics import ListAPIView
from rest_framework import permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response

import datetime as dt

from .service import ListViewSet, slice_data_by_timestamp, queryset_mean
from detector.models import Detector, DetectorData
from .serializers import DetectorSerializer, DetectorDataSerializer

class DetectorListView(ListViewSet):
    '''Список датчиков'''
    queryset = Detector.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = DetectorSerializer
    serializer_class_by_action = {
        'get_mean_data': DetectorDataSerializer
    }

    def get_query_params_date(self):
        begin_date = self.request.query_params.get('begin_date', '2055-01-01')
        end_date = self.request.query_params.get('end_date', '2055-01-01')
        currency = self.request.query_params.get('currency', '1') 
        begin_date = dt.datetime.strptime(begin_date, '%Y-%m-%d').date()
        end_date = dt.datetime.strptime(end_date, '%Y-%m-%d').date()
        currency = dt.timedelta(days=int(currency))
        return begin_date, end_date, currency

    @action(detail=False, methods=['get'])
    def get_mean_data(self, request, *args, **kwargs):
        detector = self.get_object()
        data = DetectorData.objects.filter(detector=detector)
        begin_date, end_date, currency = self.get_query_params_date()
        if kwargs.get('every', None):
            sliced_data = slice_data_by_timestamp(data, begin_date, end_date, currency)
            data = queryset_mean(sliced_data, detector, begin_date, end_date, currency)
        else:
            data = DetectorData.objects.filter(
                timestamp__gte=begin_date,
                timestamp__lte=end_date,
            )
        serializer = self.get_serializer(data, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
        # return Reponse(status=status.HTTP_200_OK)