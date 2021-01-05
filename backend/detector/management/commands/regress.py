from django.core.management.base import BaseCommand

import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import calendar
import copy

import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingRegressor

from detector.models import DetectorData
from .service import write_to_file_or_return, X_to_values, get_all_mean, data_to_arr
from neuro.models import Regressor

def get_month(i):
    return (i) % 12

def get_year(i, year):
    return year if get_month(i) != 0 else year + 1

def mean_sq_error(pred, y):
    return pow(sum([(pred_el - y_el)**2 for pred_el, y_el in zip(pred, y)]), 1/2)

class Command(BaseCommand):
    help = 'Makes s regression model'

    def handle(self, *args, **options):
        y = pd.read_csv('harvest_yields.csv')['Урожай']
        i = 0
        X = list()
        year = 2052
        while year < 2055:
            date1 = datetime(year=year, month=i%12+1, day=1)
            i += 3
            year_next, month_next = get_year(i, year), get_month(i)
            if not month_next:
                month_next = 1
            day_next = calendar.monthrange(year_next, month_next)[1]
            date2 = datetime(year=year_next, month=month_next, day=day_next)
            year = year_next
            X.append(write_to_file_or_return(date1, date2))
        X = np.array(X)
        X = X_to_values(X)
        X_train, y_train = X, y
        clf = GradientBoostingRegressor(loss='ls', verbose=True, random_state=241, n_estimators=250, learning_rate=0.1)
        clf.fit(X_train, y_train)
        pred = clf.predict(X_train)
        reg, _ = Regressor.objects.get_or_create(id=1)
        reg.model = clf
        reg.save()
        res, pH_linspace, humidity_linspace, lightning_linspace, temp_linspace = data_to_arr(get_all_mean())
        maxi = 0
        best = 0
        i = 0
        for pH in pH_linspace:
            res[0] = pH
            for humidity in humidity_linspace:
                res[1] = humidity
                for lightning in lightning_linspace:
                    res[2] = lightning
                    for temp in temp_linspace:
                        res[3] = temp
                        res_without_extra = copy.copy(res)
                        res_without_extra.append(np.var(res_without_extra))
                        pred = clf.predict(np.array(res_without_extra).reshape(1, -1))
                        i += 1
                        print(i)
                        if maxi < pred:
                            maxi = pred
                            best = res_without_extra

        print(best)
        print(maxi)