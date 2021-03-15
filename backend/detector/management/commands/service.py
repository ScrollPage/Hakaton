from django.db.models import Min, Max, Avg

import numpy as np

from detector.models import DetectorData

def get_value(value):
    if np.isnan(value):
        return None
    return round(value, 2)

def create_detector_data(general_data, data, detector, i, number):
    DetectorData.objects.create(
        detector=detector,
        temp=general_data['Температура воздуха'][i],
        timestamp=general_data['date'][i],
        humidity=get_value(data[f'Относительная влажность почвы_p{number}'][i]),
        lightning=get_value(data[f'Освещенность_p{number}'][i]),
        pH=get_value(data[f'Кислотность почвы_p{number}'][i])
    )

def write_to_file_or_return(date1, date2, file=None, write=True):
    data = DetectorData.objects.filter(
        timestamp__gte=date1,
        timestamp__lt=date2
    ) \
        .aggregate(
            Avg('pH'), 
            Avg('humidity'), 
            Avg('lightning'),
            Avg('temp'),
        )
    return data

def X_to_values(X):
    ans = list()
    for data_dict in X: 
        res = [round(float(value), 3) for value in data_dict.values()]
        res.append(np.var(res))
        ans.append(np.array(res))
    return np.array(ans)

def get_all_mean():
    return DetectorData.objects.all() \
        .aggregate(
            Avg('pH'), 
            Avg('humidity'), 
            Avg('lightning'),
            Avg('temp'),
        )

def data_to_arr(data_dict):
    res = [round(float(value), 3) for value in data_dict.values()]
    pH_linspace = np.linspace(5.530*1.2, 8.520*0.8, 20)
    humidity_linspace = np.linspace(12.110*1.2, 102.380*0.8, 20)
    lightning_linspace = np.linspace(-3.610*0.8, 107.490*0.8, 20)
    temp_linspace = np.linspace(-19.90*0.8, 41.500*0.8, 20)
    return res, pH_linspace, humidity_linspace, lightning_linspace, temp_linspace