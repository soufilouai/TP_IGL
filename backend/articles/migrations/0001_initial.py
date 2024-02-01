# Generated by Django 5.0 on 2024-01-02 16:53

import ckeditor.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Author',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('institution', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=254)),
            ],
        ),
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('summary', models.TextField()),
                ('keywords', models.CharField(max_length=255)),
                ('content', ckeditor.fields.RichTextField()),
                ('pdf', models.CharField(max_length=255)),
                ('date', models.DateField()),
                ('author', models.ManyToManyField(blank=True, related_name='author', to='articles.author')),
            ],
        ),
    ]
