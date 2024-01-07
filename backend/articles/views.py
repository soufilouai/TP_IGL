
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
import dropbox 





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

    
    

    

def upload(request):

        ACCESS_TOKEN = "sl.BtP1DeW7grVaf7D8n3T7EjNvCzbmlI_5TACBriYkK15nnKBcn2MacPcDCTxQP1U1l0jS3gketxvH3GUOmRWcdW57zY88bCrbhVpH7jyspbPjMlnevKJp6VoCJeaSlGEQZP6OdcVk_5qo4ZQa-HgAm0c"
        dbx = dropbox.Dropbox(ACCESS_TOKEN)
       
        with open(path, 'rb') as f:
                dbx.files_upload(f.read(), f'/Pdf{i}.pdf')

        
    
        # current_directory = os.path.dirname(os.path.abspath(__file__))
        # path = os.path.join(current_directory ,'..',  'drive-download-20231228T162223Z-001', f'Article_03.pdf')
        # Response = extractpdf(path)
    
        return JsonResponse({"key" : "True"})



def extract(request):
    current_directory = os.path.dirname(os.path.abspath(__file__))
    path = os.path.join(current_directory ,'..',  'drive-download-20231228T162223Z-001', f'Article_03.pdf')
    return JsonResponse(extractpdf(path))
