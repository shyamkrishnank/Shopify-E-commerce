from django.db import models
import uuid

class SportsCategory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to="sports/")

class Category(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    title = models.CharField(max_length=300)
    description = models.TextField()
    sport = models.ForeignKey(SportsCategory, on_delete=models.CASCADE, related_name='categories')

class Products(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    title = models.CharField(max_length=300)
    description = models.TextField()
    price = models.FloatField()
    stock = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=True)


