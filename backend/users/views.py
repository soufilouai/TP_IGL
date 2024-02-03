
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



# import jwt 


# # Create your views here.

# class UserRegistrationAPIView(APIView):
# 	serializer_class = UserRegisterSerializer
# 	authentication_classes = (TokenAuthentication,)
# 	permission_classes = (AllowAny,)

# 	def get(self, request):
# 		content = { 'message': 'Hello!' }
# 		return Response(content)

# 	def post(self, request):
# 		serializer = self.serializer_class(data=request.data)
# 		if serializer.is_valid(raise_exception=True):
# 			new_user = serializer.save()
# 			if new_user:
# 				print(f"Generating token for user: {new_user} {type(new_user)}")
# 				access_token = generate_access_token(new_user)
# 				data = { 'access_token': access_token }
# 				response = Response(data, status=status.HTTP_201_CREATED)
# 				response.set_cookie(key='access_token', value=access_token, httponly=True, samesite='Strict')
# 				response['Authorization'] = f'Bearer {access_token}'
# 				return response
# 		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	

# class UserViewAPI(APIView):
# 	authentication_classes = (TokenAuthentication,)
# 	permission_classes = (AllowAny,)

# 	def get(self, request):
# 		user_token = request.COOKIES.get('access_token')

# 		if not user_token:
# 			raise AuthenticationFailed('Unauthenticated user.')

# 		payload = jwt.decode(user_token, settings.SECRET_KEY, algorithms=['HS256'])

# 		user_model = get_user_model()
# 		user = user_model.objects.filter(id=payload['id']).first()
# 		user_serializer = UserSerializer(user)
# 		serialized_data = user_serializer.data
# 		serialized_data['token'] = user_token
# 		return Response(serialized_data )





# class UserLoginAPIView(APIView):
# 	serializer_class = UserLoginSerializer
# 	authentication_classes = (TokenAuthentication,)
# 	permission_classes = (AllowAny,)

# 	def post(self, request):
# 		username = request.data.get('username', None)
# 		user_password = request.data.get('password', None)

# 		if not user_password:
# 			raise AuthenticationFailed('A user password is needed.')

# 		if not username:
# 			raise AuthenticationFailed('A username is needed.')

# 		user_instance = authenticate(username=username, password=user_password)

# 		if not user_instance:
# 			raise AuthenticationFailed('User not found.')

		
# 		user_access_token = generate_access_token(user_instance)
# 		response = Response()
# 		response.set_cookie(key='access_token', value=user_access_token, httponly=True)
# 		response['Authorization'] = f'Bearer {user_access_token}'
# 		response.data = {
# 			'username' : username,
# 			'access_token': user_access_token
# 		}
# 		return response

		

# class UserLogoutViewAPI(APIView):
# 	authentication_classes = (TokenAuthentication,)
# 	permission_classes = (AllowAny,)

# 	def get(self, request):
# 		user_token = request.COOKIES.get('access_token', None)
# 		if user_token:
# 			response = Response()
# 			response.delete_cookie('access_token')
# 			response.data = {
# 				'message': 'Logged out successfully.'
# 			}
# 			return response
# 		response = Response()
# 		response.data = {
# 			'message': 'User is already logged out.'
# 		}
# 		return response





# def generate_access_token(user):
# 	payload = {
# 		'id': user.id,
# 		'exp': datetime.utcnow() + timedelta(days=1, minutes=0),
# 		'iat': datetime.utcnow(),
# 	}

# 	access_token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
# 	print('-------------------')
# 	print(settings.SECRET_KEY)
# 	print('-------------------')
# 	return access_token

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