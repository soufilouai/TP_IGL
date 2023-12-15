from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from articles.models import Article

# Create your models here.


class CustomUserManager(BaseUserManager):
	def create_user(self,username, email, password=None):
		print(f"Creating user with username: {username}, email: {email}")
		if not username:
			raise ValueError('A username is needed.')
		
		if not email:
			raise ValueError('A user email is needed.')

		if not password:
			raise ValueError('A user password is needed.')

		email = self.normalize_email(email)
		print(f"Creating user with username: {username}, email: {email}")
		
		user = self.model(username=username, email= email)
		user.set_password(password)
		user.save()
		return user

	def create_superuser(self,username, email, password=None):
		if not username:
			raise ValueError('A username is needed.')
		
		if not email:
			raise ValueError('A user email is needed.')

		if not password:
			raise ValueError('A user password is needed.')

		user = self.create_user(username, email, password)
		user.is_admin = True
		user.is_moderator = True
		user.is_staff = True
		user.is_superuser = True
		user.save()
		return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    
    username = models.CharField(max_length=100, unique= True)
    email = models.EmailField(max_length=100, unique=True)
    
    favorite_articles = models.ManyToManyField(Article, related_name='favorited_by', blank= True)
    
    is_admin = models.BooleanField(default= False)
    is_moderator = models.BooleanField(default = False)
    is_staff = models.BooleanField(default = False)
    is_superuser = models.BooleanField(default = False)
	
    
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']
    objects = CustomUserManager()
	
    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        related_name='user_groups',  # Set a unique related_name
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
    )
	
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        related_name='user_permissions_set',  # Set a unique related_name
        help_text='Specific permissions for this user.',
        related_query_name='user',
    )

    def __str__(self):
        return self.username