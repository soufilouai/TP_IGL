# from django.apps import AppConfig


# class UsersConfig(AppConfig):
#     default_auto_field = 'django.db.models.BigAutoField'
#     name = 'users'
    
#     def ready(self):
#         from django.contrib.auth.models import Permission, Group
#         from django.contrib.contenttypes.models import ContentType
#         from users.models import CustomUser


        
#         moderator_permission, created = Permission.objects.get_or_create(
#             codename='can_moderate_content',
#             name='Can moderate content',
#             content_type=ContentType.objects.get_for_model(CustomUser)
#         )
#         admin_permission, created = Permission.objects.get_or_create(
#             codename='can_add_moderators',
#             name='Can add moderators',
#             content_type=ContentType.objects.get_for_model(CustomUser)
#         )
        
#         admin_group, created = Group.objects.get_or_create(name='Admin') 
#         admin_group.permissions.add(admin_permission)
        
#         moderator_group, created = Group.objects.get_or_create(name='Moderator')
#         moderator_group.permissions.add(moderator_permission)