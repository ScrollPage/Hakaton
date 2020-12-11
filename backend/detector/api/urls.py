from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import DetectorListView

urlpatterns = [
    
]

detector_list = DetectorListView.as_view({
    'get': 'list'
})

detector_mean_data = DetectorListView.as_view({
    'get': 'get_mean_data'
})

urlpatterns += [
    path('detector/', detector_list, name='detector-list'),
    path('detector/<int:pk>', detector_mean_data, name='detector-mean-data'),
]

# r = DefaultRouter()
# r.register('detector', DetectorListView,  basename='detector')