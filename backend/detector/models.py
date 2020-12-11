from django.db import models
from django.contrib.postgres.indexes import BrinIndex

from random import uniform
from datetime import datetime, timedelta
# from picklefield.fields import PickledObjectField

class Detector(models.Model):

    def _str__(self):
        return str(self.id)

    class Meta:
        verbose_name = 'Датчик'
        verbose_name_plural = 'Датчики'

class DetectorData(models.Model):
    detector = models.ForeignKey(
        Detector, 
        verbose_name='Привязанный датчик',
        on_delete=models.DO_NOTHING, 
        related_name='data'
    )
    temp = models.DecimalField('Первая температура', max_digits=6, decimal_places=3, null=True)
    humidity = models.DecimalField('Влажность', max_digits=6, decimal_places=3, null=True)
    lightning = models.DecimalField('Освещенность', max_digits=6, decimal_places=3, null=True)
    pH = models.DecimalField('Кислотность', max_digits=6, decimal_places=3, null=True)
    timestamp = models.DateTimeField('Дата сбора данных')

    def __str__(self):
        return f'Отчет в {self.timestamp} от {self.detector}'

    class Meta:
        verbose_name = 'Данные датчика'
        verbose_name_plural = 'Данные датчиков'
        indexes = [BrinIndex(fields=['timestamp'])]