from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import DetectorListView

urlpatterns = [
    
]

r = DefaultRouter()
r.register('detector', DetectorListView,  basename='detector')