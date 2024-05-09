from django.urls import path
from .views import *

urlpatterns = [
    path('sports/', GetSportsCategoryView.as_view()),
    path('addsports/', AddSportsCategoryView.as_view()),

    path('category/<uuid:id>', GetCategoryView.as_view()),
    path('addcategory/<uuid:id>', AddCategoryView.as_view()),

    path('getproducts/<uuid:id>', GetProductsView.as_view()),
    path('getallproducts/', GetAllProductsView.as_view()),
    path('addproducts/<uuid:id>', AddProductView.as_view()),

#user
    path('getsportproducts/<uuid:id>', GetSportsProductView.as_view()),
    path('getproductdetails/<uuid:id>', GetProductDetailsView.as_view())

]