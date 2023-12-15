from django.urls import path, include
from .views import *

urlpatterns = [
    
    path('register/', UserRegistrationAPIView.as_view()),
    path('', UserViewAPI.as_view()),
    path('login/', UserLoginAPIView.as_view()),
    path('logout/', UserLogoutViewAPI.as_view()),

]
