from django.urls import path
from .views import *

urlpatterns = [
    path('sports/', GetSportsCategoryView.as_view()),
    path('addsports/', AddSportsCategoryView.as_view())

]