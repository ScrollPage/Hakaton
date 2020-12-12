from rest_framework.views import APIView
from rest_framework import status, permissions
from rest_framework.response import Response

class AnswerView(APIView):
    '''Ответ нейросети'''
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        pass