from django.urls import path
from .views import *

urlpatterns = [
    path('addtocart/', AddToCartView.as_view()),
    path('getcart/', UserCartView.as_view()),
    path('addquantity/', AddQuantity.as_view()),
    path('remove/<uuid:id>', RemoveCartItemView.as_view()),

    path('checkout/', CheckoutDetailsView.as_view()),
    path('confirmorder/', OrderConfirmView.as_view()),
    path('getorders/', OrderUserSideView.as_view()),
    path('orderdetails/<uuid:id>', OrderDetailedView.as_view()),
    path('getinvoice/<uuid:id>', InvoiceView.as_view()),

    path('allorders/', AllOrdersView.as_view()),
    path('generatecsv/', Generate_CSV_View.as_view())

]
