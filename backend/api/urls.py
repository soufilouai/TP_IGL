from django.urls import path, include
from .views import *
    

urlpatterns = [
    path('articles/', include('articles.urls'), name='articles'),
    path('users/', include('users.urls'), name='users'),
    
]
