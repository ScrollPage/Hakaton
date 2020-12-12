from rest_framework import serializers

from detector.models import Detector, DetectorData

class DetectorSerializer(serializers.ModelSerializer):
    '''Сериалазация датчиков'''
    bad_pH = serializers.BooleanField()
    bad_lightning = serializers.BooleanField()
    bad_humidity = serializers.BooleanField()
    bad_temp = serializers.BooleanField()

    class Meta:
        model = Detector
        fields = '__all__'

class DetectorDataSerializer(serializers.ModelSerializer):
    '''Сериализация данных датчика'''
    min_timestamp = serializers.DateTimeField()
    max_timestamp = serializers.DateTimeField()

    class Meta:
        model = DetectorData
        fields = [
            'min_timestamp', 
            'max_timestamp', 
            'timestamp',
            'pH', 
            'humidity', 
            'lightning', 
            'temp'
        ]