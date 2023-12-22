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
from django.shortcuts import render
from elasticsearch_dsl import Search



def home(request) : 
    
    """ new_article = Article(
    title='Sample Article',
    summary='A  summary of the article.',
    keywords='keyword1, keyword2',
    content='This is the main content of the article.',
    pdf='sample.pdf',
    date='2023-01-01T12:00:00Z'  # Adjust the date format as needed
    ) 
    new_article.save() """
   
    # Your search logic here
    s = Search(using='default')
   
    s = s.query('match', summary='brief')


    response = s.execute()
    hits = response['hits']['hits']
    for hit in response :
      hit.summary = "this is a correction"

    # Render the results in a template
    return render(request, 'search_results.html', {'hits': hits})


urlpatterns = [
    path('admin/', admin.site.urls),
     path('', home, name='search_view'),
    path('api/', include('api.urls')),  # Use the app name 'articles' in include
    # Add other URL patterns as needed
]
