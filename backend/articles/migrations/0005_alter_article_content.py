# Generated by Django 5.0 on 2024-02-01 23:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0004_alter_article_content'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='content',
            field=models.TextField(blank=True, db_collation='utf8mb4_general_ci', db_column='content', db_index=True, default=None, null=True),
        ),
    ]