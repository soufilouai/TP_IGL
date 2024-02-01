
from rest_framework import generics
from .models import Article
from .serializers import *
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework.response import Response
from django.contrib.auth.models import Permission , Group
from rest_framework import status,permissions
from rest_framework.permissions import IsAuthenticated


from .article_utils import *



class CanModerateContentPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        # Check if the user has the 'can_moderate_content' permission
        
       
        return request.user.is_moderator
class ArticlesAPIView(generics.ListAPIView):
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
    def post(self, request):
        if request.method == 'POST':
        
            data = request.data
            
            
            query = data.get('keywords')
            
        
            search_results_ids = search_Article(query)
            
            
            articles = Article.objects.filter(id__in=search_results_ids)
            
            
            serializer = Article_results(articles, many=True)
            serialized_data = serializer.data
            
            return Response({'results': serialized_data}, status=status.HTTP_200_OK)




    
"""def filter_results(request , ids):
    if request.method == 'GET':
        query = request.GET.get('query', '')
        search_results_ids = search_Article(query)
        
        articles = Article.objects.filter(id__in=search_results_ids)
        
        
        serializer = Article_results(articles, many=True)
        serialized_data = serializer.data
        
        return Response({'results': serialized_data}, status=status.HTTP_200_OK)"""

  
    

