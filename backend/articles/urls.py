
from django.urls import path
from .views import ArticlesAPIView

urlpatterns = [
    path('', ArticlesAPIView.as_view(), name='article-list'),
]
