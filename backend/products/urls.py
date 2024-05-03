from django.urls import path
from .views import *

urlpatterns = [
    path('sports/', GetSportsCategory.as_view()),

]