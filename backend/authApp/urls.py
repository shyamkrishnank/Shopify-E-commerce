from django.urls import path
from .views import *

urlpatterns = [
    path('signup/', SignUpView.as_view()),
    path('login/', LoginView.as_view())
]
