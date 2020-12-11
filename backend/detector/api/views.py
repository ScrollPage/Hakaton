from rest_framework.generics import ListAPIView
from rest_framework import permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .service import ListViewSet
from detector.models import Detector, DetectorData
from .serializers import DetectorSerializer

class DetectorListView(ListViewSet):
    '''Список датчиков'''
    queryset = Detector.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = DetectorSerializer

    @action(detail=False, methods=['get'])
    def get_mean_data(self, request, *args, **kwargs):
        detector = self.get_object()
        data = DetectorData.objects.filter(detector=detector)
        return Response()