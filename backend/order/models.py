from django.db import models
from authApp.models import CustomUser
from products.models import Products
import uuid
import string
import random



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


#order models
def generate_order_id():
    chars = string.ascii_uppercase + string.digits
    return ''.join(random.choice(chars) for _ in range(10))
class Order(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now=True)
    order_num = models.CharField(max_length=20, default=generate_order_id())
    payment_type = models.CharField(max_length=100, default="CASH ON DELIVERY")
    status = models.CharField(max_length=100, default='Order Confirmed')
    total_price = models.FloatField()

class OrderItems(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='orderitems')
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    quantity = models.IntegerField()



#Invoice model
def generate_invoice_num():
    chars = string.ascii_uppercase + string.digits
    return ''.join(random.choice(chars) for _ in range(10))
class Invoice(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='invoice')
    invoice_pdf = models.FileField(upload_to='invoice/')
    invoice_number = models.CharField(max_length=20 , default=generate_invoice_num())

