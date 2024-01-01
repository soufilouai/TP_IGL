"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# myproject/urls.py
from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from articles.models import Article
from django.shortcuts import render , get_object_or_404
from elasticsearch_dsl import Search , Q , DateRange
from elasticsearch_dsl.query import MultiMatch
from datetime import date
from articles.article_utils import *



def home(request) : 
    
    """new_article = Article(
    title='delete',
    summary='rien de special',
    keywords='keyword1, keyword2',
    content='just trying deleting',
    pdf='sample.pdf',
    date='2023-01-01T12:00:00Z'  # Adjust the date format as needed
    )  
    new_article.save()
    new_article.delete"""

    #new_article.title = "gorgeous"  
    #new_article.save()
   
    #article = Article.objects.get(id=24)
    #article = get_object_or_404(Article, id=20)
    #print(article.title)
    #article.delete()

    r = search_Article('einstein')
   

    d= date(2022, 1, 1)
    f= date(2022, 3, 1)
    #res =filter_date(r , d , f )

    
    res = filter_results(r ,'' , 'einstein' , "")
    for i in res:
        article = get_object_or_404(Article, id=i)
        print(article.title , article.id  )
        
  
    
    return render(request, 'search_results.html')
     



urlpatterns = [
    path('admin/', admin.site.urls),
    path('search/', home, name='search_view'),
    path('api/', include('api.urls')),
    path('articles/', include('articles.urls')),  # Use the app name 'articles' in include
    # Add other URL patterns as needed
]
