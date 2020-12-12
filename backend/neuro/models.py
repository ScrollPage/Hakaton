from django.db import models

from picklefield.fields import PickledObjectField

class Regressor(models.Model):
    '''Регрессионная модель'''
    model = PickledObjectField('Модель', null=True)