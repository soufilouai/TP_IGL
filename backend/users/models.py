from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from articles.models import Article
from django.contrib.auth.models import Permission , Group
from django.contrib.contenttypes.models import ContentType
from articles.models import *




    # Create a custom permission for moderators



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
		user.save(using=self.db)
		return user

	def create_superuser(self,username, email, password=None):
		if not username:
			raise ValueError('A username is needed.')
		
		if not email:
			raise ValueError('A user email is needed.')

		if not password:
			raise ValueError('A user password is needed.')

		user = self.create_user(username, email, password)
		# user.is_admin = True
		user.is_moderator = True
		user.is_staff = True
		user.is_superuser = True
		user.save()
		return user






class CustomUser(AbstractBaseUser, PermissionsMixin):
    
    username = models.CharField(max_length=100, unique= True)
    email = models.EmailField(max_length=100, unique=True)
    
    favorite_articles = models.ManyToManyField(Article, related_name='favorited_by', blank= True)
    
    # is_admin = models.BooleanField(default= False)
    is_moderator = models.BooleanField(default = False)
    is_staff = models.BooleanField(default = False)
    is_superuser = models.BooleanField(default = False)
	
    
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']
    objects = CustomUserManager()
	
    groups = models.ManyToManyField(
        Group,
        related_name='user_groups',  # Set a unique related_name
        blank=True
    )
	
    user_permissions = models.ManyToManyField(
        Permission,
        
        blank=True,
        related_name='user_permissions_set',  # Set a unique related_name
    )
    
    # def save(self, *args, **kwargs):
        
    #     super().save(*args, **kwargs)
        
    #     moderator_group = Group.objects.get(name='Moderator')
    #     permission= Permission.objects.get(codename='can_moderate_content')
    #     id = (self.id)
    #     print('le id', id)
    #     user = CustomUser.objects.get(id=id)
        
    #     if user.is_moderator:
    #         user.groups.add(moderator_group)
    #         user.user_permissions.add(permission)
    #     else:
    #         user.groups.remove(moderator_group)
    #         user.user_permissions.remove(permission)
            
        
    
        
    #     moderator = user.groups.filter(name='Moderator').exists()
    #     if moderator:
    #         print('User :' , user.username ,user.id ,' is in the Moderator group')
    #         print(user.groups.all())
    #     else:
    #         print('User '+ user.username +' is not in the Moderator group')
    #         print(user.groups.all())
        
    #     super().save(*args,**kwargs)
        


          
        

    

    # def __str__(self):
    #     return self.username
    
    
    
