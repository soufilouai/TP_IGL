
from django.urls import path
from .views import *

urlpatterns = [
    path('', ArticlesAPIView.as_view(), name='article-list'),
    path('results/' , search_Article ) ,
] 
