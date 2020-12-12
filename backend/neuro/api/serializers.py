from rest_framework import serializers

class AnsSeralizer(serializers.Serializer):
    '''Ответ нейросети'''
    answer = serializers.DecimalField(max_digits=6, decimal_places=3)