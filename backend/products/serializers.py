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
    category = CategorySerializer(read_only=True)
    class Meta:
        model = Products
        fields = '__all__'

class ProductSaveSerializer(ModelSerializer):
    class Meta:
        model = Products
        fields = '__all__'


#for user


class ProductBasicDetailsSerializer(ModelSerializer):
    class Meta:
        model = Products
        fields = ['id','title','price','stock','image1']
