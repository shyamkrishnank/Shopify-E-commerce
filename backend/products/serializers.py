from rest_framework.serializers import ModelSerializer
from .models import SportsCategory, Category, Products


class SportsCategorySerializer(ModelSerializer):
    class Meta:
        model = SportsCategory
        fields = '__all__'


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ProductSerializer(ModelSerializer):
    class Meta:
        model = Products
        fields = '__all__'
