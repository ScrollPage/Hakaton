from rest_framework.generics import ListAPIView
from rest_framework import permissions

from detector.models import Detector  
from .serializers import DetectorSerializer

class DetectorListView(ListAPIView):
    '''Список датчиков'''
    queryset = Detector.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = DetectorSerializer
