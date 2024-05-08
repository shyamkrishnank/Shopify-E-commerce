from rest_framework.serializers import ModelSerializer

from .models import CartItems, OrderItems, Order, Invoice
from products.serializers import ProductSerializer, ProductBasicDetailsSerializer
from authApp.serializers import UserBasicDetailSerializer


class CartItemSerializer(ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = CartItems
        fields = '__all__'

class CartItemSaveSerializer(ModelSerializer):

    class Meta:
        model = CartItems
        fields = '__all__'



class OrderSaveSerializer(ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'


class OrderItemSerializer(ModelSerializer):
    class Meta:
        model = OrderItems
        fields = '__all__'


class OrderItemDetailSerializer(ModelSerializer):
    product = ProductBasicDetailsSerializer( read_only=True)
    class Meta:
        model = OrderItems
        fields = '__all__'


class OrderDetailsSerializer(ModelSerializer):
    orderitems = OrderItemDetailSerializer(many=True, read_only=True)
    user = UserBasicDetailSerializer(read_only = True)
    class Meta:
        model = Order
        fields = '__all__'


class InvoiceSerializer(ModelSerializer):
    class Meta:
        model = Invoice
        fields = '__all__'