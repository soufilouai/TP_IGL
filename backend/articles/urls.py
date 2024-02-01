
from django.urls import path
from .views import *


urlpatterns = [
    path('', ArticlesAPIView.as_view(), name='article-list'),
    path('<int:pk>/', ArticleDetails.as_view(), name='article-details'),
    path('<int:pk>/addFav/', ArticleAddFav.as_view(), name='article-favourite'),
    path('mod/', ArticlesModAPIView.as_view(), name='article-list-mod'),
    path('mod/<int:pk>/', ArticleDetailsMod.as_view(), name='article-details-mod'),
    path('results/' , SearchResults.as_view() ) ,
] 
