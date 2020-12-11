from rest_framework import serializers

from detector.models import Detector

class DetectorSerializer(serializers.ModelSerializer):
    '''Сериалазация датчиков'''

    class Meta:
        model = Detector
        fields = '__all__'