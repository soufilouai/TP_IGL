# Generated by Django 5.0 on 2024-02-05 11:21

import ckeditor.fields
import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0007_alter_article_content'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='content',
            field=ckeditor.fields.RichTextField(db_column='content', default=None),
        ),
        migrations.AlterField(
            model_name='article',
            name='date',
            field=models.DateField(blank=True, default=datetime.datetime.now, null=True),
        ),
    ]
