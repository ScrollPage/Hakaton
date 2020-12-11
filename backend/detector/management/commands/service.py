from detector.models import DetectorData

import numpy as np

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