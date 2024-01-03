
from rest_framework import generics
from .models import Article
from .serializers import ArticleSerializer
from rest_framework.decorators import APIView
from django.http import JsonResponse
from rest_framework.response import Response
from django.contrib.auth.models import Permission , Group
from rest_framework import status,permissions
from rest_framework.permissions import IsAuthenticated
from .utils.extract_pdf import extractpdf
from django.http import HttpResponse
import os




class CanModerateContentPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        # Check if the user has the 'can_moderate_content' permission
        
       
        return request.user.is_moderator




        

class ArticlesAPIView(generics.ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated,CanModerateContentPermission]
   

class ArticleDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated]

    
    

    

def extract(request):
  
        current_directory = os.path.dirname(os.path.abspath(__file__))
        path = os.path.join(current_directory ,'..',  'drive-download-20231228T162223Z-001', f'Article_03.pdf')
        Response = extractpdf(path)
    
        return JsonResponse(Response)