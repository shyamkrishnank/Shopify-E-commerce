# Generated by Django 5.0.4 on 2024-05-04 14:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='products',
            name='category',
        ),
        migrations.RemoveField(
            model_name='products',
            name='image1',
        ),
        migrations.RemoveField(
            model_name='products',
            name='image2',
        ),
    ]