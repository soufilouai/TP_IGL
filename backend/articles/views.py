
from rest_framework import generics
from .models import Article
from .serializers import *
from rest_framework.decorators import APIView
from django.http import JsonResponse
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import Permission , Group
from rest_framework import status,permissions
from rest_framework.permissions import IsAuthenticated
import json


from .article_utils import *



class CanModerateContentPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        # Check if the user has the 'can_moderate_content' permission
        
       
        return request.user.is_moderator
class ArticlesAPIView(generics.ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    # permission_classes = [IsAuthenticated]
    permission_classes = [permissions.AllowAny]
   

class ArticleDetails(generics.RetrieveAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    # permission_classes = [IsAuthenticated]
    permission_classes = [permissions.AllowAny]
    
class ArticlesModAPIView(generics.ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated,CanModerateContentPermission]
   

class ArticleDetailsMod(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated,CanModerateContentPermission]



class SearchResults(APIView):
    
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        if request.method == 'POST':
        
            data = request.data
            
    
            query = data.get('keywords')
            
        
            search_results_ids = search_Article(query)
            
            
            articles = Article.objects.filter(id__in=search_results_ids)
            
            
            serializer = Article_results(articles, many=True)
            serialized_data = serializer.data
            json_data = json.dumps(serialized_data)

            #print(json_data)
            #return Response({'results': serialized_data}, status=status.HTTP_200_OK)
            return Response(json_data, status=status.HTTP_200_OK)

            # print(serialized_data)
            # response_data = []
            # for article in articles:
            #     article_data = {
            #         "title": article.title,
            #         "summary": article.summary,
            #         "keywords": article.keywords,
            #         "content": article.content,
            #         "pdf": article.pdf,
            #         "date": article.date.strftime('%Y-%m-%d'),  # Format the date as needed
            #     }
                
            #     # If there are multiple authors, include them in the response
            #     if article.author.exists():
            #         authors_data = []
            #         for author in article.author.all():
            #             author_data = {
            #                 "name": author.name,
            #                 "institution": author.institution,
            #             }
            #             authors_data.append(author_data)
                    
            #         article_data["author"] = authors_data

            #     response_data.append(article_data)
        
    def get(self, request):
        if request.method == 'GET':
            resultat = discover_Article()
            articles = Article.objects.filter(id__in=resultat)
            
            
            serializer = Article_results(articles, many=True)
            serialized_data = serializer.data
            json_data = json.dumps(serialized_data)
            print(json_data)
            return Response(json_data, status=status.HTTP_200_OK)
        

class Filter_results(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request):
        if request.method == 'GET':
        
            data = request.data
            keywords = data.get('keywords')
            author = data.get('author')
            institution = data.get('institution')
            start_date = data.get('start_date')
            end_date = data.get('end_date')
            
            
            query = data.get('keyword')
            
        
            search_results_ids = search_Article(query)
            results = filter_results(search_results_ids ,institution , author , keywords)
            if (start_date!=None and  end_date !=None and start_date<= end_date) :
              results = filter_date(results , start_date , end_date)

            
            articles = Article.objects.filter(id__in=results)
            
            
            serializer = Article_results(articles, many=True)
            serialized_data = serializer.data
            json_data = json.dumps(serialized_data)

        
            return Response(json_data, status=status.HTTP_200_OK)
        


class Favorislist(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request):
        if request.method == 'GET':
            user = request.user
            user_favorite_article_ids = user.favorite_articles.values_list('id', flat=True)
            articles = Article.objects.filter(id__in=user_favorite_article_ids)

            serializer = Article_Favoris(articles, many=True)
            serialized_data = serializer.data
            json_data = json.dumps(serialized_data)
            return Response(json_data, status=status.HTTP_200_OK)
        


class Favoris(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request):
        if request.method == 'GET':
            user = request.user
            user_favorite_article_ids = user.favorite_articles.values_list('id', flat=True)
            articles = Article.objects.filter(id__in=user_favorite_article_ids)

            serializer = Article_results(articles, many=True)
            serialized_data = serializer.data
            json_data = json.dumps(serialized_data)
            return Response(json_data, status=status.HTTP_200_OK)
        
        

class Article_modification(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request):
        if request.method == 'GET':
            id = request.id 
            article = Article.objects.filter(id__in=id)
            serializer = Article_modification(article)
            serialized_data = serializer.data
            json_data = json.dumps(serialized_data)

            return Response(json_data, status=status.HTTP_200_OK)
        
    def put(self, request, pk):
        instance = get_object_or_404(Article, pk=pk)
        serializer = ArticleSerializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


           



                
            
        



    
"""def filter_results(request , ids):
    if request.method == 'GET':
        query = request.GET.get('query', '')
        search_results_ids = search_Article(query)
        
        articles = Article.objects.filter(id__in=search_results_ids)
        
        
        serializer = Article_results(articles, many=True)
        serialized_data = serializer.data
        
        return Response({'results': serialized_data}, status=status.HTTP_200_OK)"""