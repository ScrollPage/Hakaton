from rest_framework import serializers

class AnsSeralizer(serializers.Serializer):
    '''Ответ нейросети'''
    answer = serializers.DecimalField()