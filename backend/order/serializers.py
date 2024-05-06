from rest_framework.serializers import ModelSerializer

from .models import CartItems
from products.serializers import ProductSerializer


class CartItemSerializer(ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = CartItems
        fields = '__all__'

class CartItemSaveSerializer(ModelSerializer):

    class Meta:
        model = CartItems
        fields = '__all__'