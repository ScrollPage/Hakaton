from rest_framework import serializers
from rest_framework.authtoken.models import Token

from client.models import Client

class ClientMeSerializer(serializers.ModelSerializer):
    '''Сериализация пользователя'''
    class Meta:
        model = Client
        fields = ['id', 'email', 'first_name', 'last_name', 'system']
        # read_only_fields = ['id', 'email', 'first_name', 'last_name']

class TokenSerialzizer(serializers.Serializer):
    '''Сериализация ключа токена'''
    
    token = serializers.CharField()