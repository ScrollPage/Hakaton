from django.urls import path

from .views import AnswerView

urlpatterns = [
    path('predict', AnswerView.as_view(), name='predict')
]