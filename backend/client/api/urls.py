from django.urls import path

from . import views

urlpatterns = [
    
]

activate = views.ClientActivity.as_view({
    'post': 'activate'
})

urlpatterns += [
    path('activate/', activate, name='activate'),
]