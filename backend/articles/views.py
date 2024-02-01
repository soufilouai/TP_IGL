
from rest_framework import generics
from .models import Article
from .serializers import *
from rest_framework.decorators import APIView
from django.http import JsonResponse
from rest_framework.response import Response
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
    permission_classes = [permissions.AllowAny]
    # permission_classes = [IsAuthenticated,CanModerateContentPermission]
   

class ArticleDetailsMod(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [permissions.AllowAny]
    # permission_classes = [IsAuthenticated,CanModerateContentPermission]
    
    
    
class ArticleAddFav(generics.RetrieveUpdateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    def post(self, request,*args, **kwargs):
        article = self.get_object()
        user = request.user  # Assuming you have authentication enabled

        if user.is_authenticated:
            # Add the article to the user's favorites
            if (user.favorite_articles.filter(pk=article.pk).exists()):
                user.favorite_articles.remove(article)
                return Response({'detail': 'Article removed from favorites successfully.'}, status=status.HTTP_200_OK)
            else:
                user.favorite_articles.add(article)
                return Response({'detail': 'Article added to favorites successfully.'}, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Authentication required to add favorites.'}, status=status.HTTP_401_UNAUTHORIZED)
    



class SearchResults(APIView):
    
    permission_classes = [permissions.AllowAny]
    def get(self, request):
        if request.method == 'GET':
            resultat = discover_Article()
            articles = Article.objects.filter(id__in=resultat)
            
            
            serializer = Article_results(articles, many=True)
            serialized_data = serializer.data
            json_data = json.dumps(serialized_data)
            print(json_data)
            return Response(json_data, status=status.HTTP_200_OK)
        
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
        
   

                
            
        



    
"""def filter_results(request , ids):
    if request.method == 'GET':
        query = request.GET.get('query', '')
        search_results_ids = search_Article(query)
        
        articles = Article.objects.filter(id__in=search_results_ids)
        
        
        serializer = Article_results(articles, many=True)
        serialized_data = serializer.data
        
        return Response({'results': serialized_data}, status=status.HTTP_200_OK)"""