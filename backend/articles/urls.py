
from django.urls import path
from .views import *

urlpatterns = [
    path('', ArticlesAPIView.as_view(), name='article-list'),
    path('<int:pk>/', ArticleDetails.as_view(), name='article-details'),
]
