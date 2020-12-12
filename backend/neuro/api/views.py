from rest_framework.views import APIView
from rest_framework import status, permissions
from rest_framework.response import Response

import numpy as np

from detector.models import DetectorData
from neuro.models import Regressor
from detector.management.commands.service import write_to_file_or_return, X_to_values
from .serializers import AnsSeralizer

class AnswerView(APIView):
    '''Ответ нейросети'''
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AnsSeralizer

    def get(self, request, *args, **kwargs):
        begin_date = self.request.query_params.get('begin_date', '2055-01-01')
        end_date = self.request.query_params.get('end_date', '2055-01-01')

        data_dict = write_to_file_or_return(begin_date, end_date)
        res = [round(float(value), 3) for value in data_dict.values()]
        res.append(np.var(res))
        reg = Regressor.objects.get(id=1)
        pred = reg.model.predict(np.array(res).reshape(1, -1))
        serializer = self.serializer_class(
            data={'answer': round(float(pred[0]), 2)}
        )
        serializer.is_valid(raise_exception=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
