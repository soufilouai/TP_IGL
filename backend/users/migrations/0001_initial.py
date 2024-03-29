# Generated by Django 5.0 on 2024-01-02 16:52

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('articles', '__first__'),
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('username', models.CharField(max_length=100, unique=True)),
                ('email', models.EmailField(max_length=100, unique=True)),
                ('is_moderator', models.BooleanField(default=False)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
                ('favorite_articles', models.ManyToManyField(blank=True, related_name='favorited_by', to='articles.article')),
                ('groups', models.ManyToManyField(blank=True, related_name='user_groups', to='auth.group')),
                ('user_permissions', models.ManyToManyField(blank=True, related_name='user_permissions_set', to='auth.permission')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
