
from rest_framework import generics
from .models import Article
from .serializers import ArticleSerializer
from rest_framework.decorators import APIView
from django.http import JsonResponse
from rest_framework.response import Response
from django.contrib.auth.models import Permission , Group
from rest_framework import status,permissions
from rest_framework.permissions import IsAuthenticated




class CanModerateContentPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        # Check if the user has the 'can_moderate_content' permission
        
       
        return request.user.is_moderator




        

class ArticlesAPIView(generics.ListAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated]
   

class ArticleDetails(generics.RetrieveAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated]
    
class ArticlesModAPIView(generics.ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated,CanModerateContentPermission]
   

class ArticleDetailsMod(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated,CanModerateContentPermission]
    
    

    

