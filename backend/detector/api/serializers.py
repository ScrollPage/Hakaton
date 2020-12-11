from rest_framework import serializers

from detector.models import Detector, DetectorData

class DetectorSerializer(serializers.ModelSerializer):
    '''Сериалазация датчиков'''

    class Meta:
        model = Detector
        fields = '__all__'

class DetectorDataSerializer(serializers.ModelSerializer):
    '''Сериализация данных датчика'''

    class Meta:
        model = DetectorData
        fields = '__all__'