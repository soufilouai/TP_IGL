from django.urls import path, include
from .views import *

urlpatterns = [
    
    path('register/', UserRegistrationAPIView.as_view(), name='registration'),
    path('', UserViewAPI.as_view(), name='user_info'),
    path('login/', UserLoginAPIView.as_view(), name='login'),
    path('logout/', UserLogoutViewAPI.as_view(), name='logout'),

]
