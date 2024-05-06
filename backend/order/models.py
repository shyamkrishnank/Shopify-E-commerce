from django.db import models
from authApp.models import CustomUser
from products.models import Products
import uuid

class Cart(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='cart')
    created_date = models.DateTimeField(auto_now=True)

    @property
    def total_price(self):
        total = 0
        for items in self.cartitems.all():
            total += items.product.price * items.quantity
        return total


class CartItems(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    cart = models.ForeignKey(Cart,on_delete=models.CASCADE, related_name='cartitems')
    product = models.ForeignKey(Products,related_name="products", on_delete=models.CASCADE)
    quantity = models.IntegerField()

