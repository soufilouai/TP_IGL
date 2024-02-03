from django.urls import path, include
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    
    path('register/', UserRegistrationAPIView.as_view(), name='registration'),
    # path('', UserViewAPI.as_view(), name='user_info'),
    
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token-refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # path('login/', UserLoginAPIView.as_view(), name='login'),
    # path('logout/', UserLogoutViewAPI.as_view(), name='logout'),

]
