from django.core.management.base import BaseCommand

import pandas as pd
import numpy as np

from detector.models import Detector, DetectorData
from .service import create_detector_data

class Command(BaseCommand):
    help = 'Uploads data from .csv'

    def add_arguments(self, parser):
        parser.add_argument('name', type=str)

    def handle(self, *args, **options):
        for _ in range(5-Detector.objects.count()):
            Detector.objects.create()

        detector1 = Detector.objects.get(id=1)
        detector2 = Detector.objects.get(id=2)
        detector3 = Detector.objects.get(id=3)
        detector4 = Detector.objects.get(id=4)
        detector5 = Detector.objects.get(id=5)

        data = pd.read_csv(options['name'])
        data_general = data[data.columns[1:3]]

        for i in range(len(data)):
            create_detector_data(data_general, data[data.columns[3:6]], detector1, i, 1)
            create_detector_data(data_general, data[data.columns[6:9]], detector2, i, 2)
            create_detector_data(data_general, data[data.columns[9:12]], detector3, i, 3)
            create_detector_data(data_general, data[data.columns[12:15]], detector4, i, 4)
            create_detector_data(data_general, data[data.columns[15:18]], detector5, i, 5)
