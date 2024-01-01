
from django.urls import path
from .views import *


urlpatterns = [
    path('', ArticlesAPIView.as_view(), name='article-list'),
    path('<int:pk>/', ArticleDetails.as_view(), name='article-details'),
    path('mod/', ArticlesModAPIView.as_view(), name='article-list-mod'),
    path('<int:pk>/mod/', ArticleDetailsMod.as_view(), name='article-details-mod'),
    path('results/' , SearchResults.as_view() ) ,
] 
