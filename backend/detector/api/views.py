from rest_framework.generics import ListAPIView
from rest_framework import permissions
from rest_framework.decorators import action

from .service import ListViewSet
from detector.models import Detector  
from .serializers import DetectorSerializer

class DetectorListView(ListViewSet):
    '''Список датчиков'''
    queryset = Detector.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = DetectorSerializer

    @action(detail=False, methods=['get'])
    def get_mean_data(self, request, *args, **kwargs):
        detector = self.get_object()