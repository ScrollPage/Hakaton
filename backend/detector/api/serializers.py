from rest_framework import serializers

from detector.models import Detector, DetectorData

class DetectorSerializer(serializers.ModelSerializer):
    '''Сериалазация датчиков'''
    good_pH = serializers.IntegerField()
    good_lightning = serializers.IntegerField()
    good_humidity = serializers.IntegerField()
    good_temp = serializers.IntegerField()

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