from django.core.management.base import BaseCommand

import numpy as np
from datetime import datetime, timedelta
import calendar

from detector.models import Detector, DetectorData
from .service import write_to_file_or_return

def get_month(i):
    return (i) % 12

def get_year(i, year):
    return year if get_month(i) != 0 else year + 1

class Command(BaseCommand):
    help = 'Writes mean data to .txt'

    def handle(self, *args, **options):
        f = open('mean_data.txt', 'a')

        i = 0
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
            write_to_file_or_return(f, date1, date2)

        f.close()
