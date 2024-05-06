from django.urls import path
from .views import *

urlpatterns = [
    path('addtocart/', AddToCartView.as_view()),
    path('getcart/', UserCartView.as_view()),
    path('addquantity/', AddQuantity.as_view()),
    path('remove/<uuid:id>', RemoveCartItemView.as_view())

]