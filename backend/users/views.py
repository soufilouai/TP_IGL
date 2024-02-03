
from django.shortcuts import render
from rest_framework_simplejwt.tokens import Token
from .serializers import *
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import authenticate
from django.conf import settings
from django.contrib.auth import get_user_model
from django.conf import settings
from datetime import datetime, timedelta
from .models import CustomUser
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer




class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user) :
        token = super().get_token(user)
        token['is_moderator'] = user.is_moderator
        token['is_admin'] = user.is_superuser
        token['username'] = user.username
        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class= MyTokenObtainPairSerializer







class UserRegistrationAPIView(APIView):
	serializer_class = UserRegisterSerializer
	permission_classes = (AllowAny,)

	def get(self, request):
		content = { 'message': 'Hello!' }
		return Response(content)

	def post(self, request):
		serializer = self.serializer_class(data=request.data)
		if serializer.is_valid(raise_exception=True):
			new_user = serializer.save()
			new_user
			if new_user:
				data = { 'message': 'user created' }
				response = Response(data, status=status.HTTP_201_CREATED)
				return response
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)