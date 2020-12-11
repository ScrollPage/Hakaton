from django.urls import path

from .views import DetectorListView

urlpatterns = [
    path('detector/', DetectorListView.as_view(), name='detector-list')
]