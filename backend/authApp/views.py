from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny

from .models import CustomUser
from .serializers import SignUpSerializer
from .token import get_tokens_for_user


class SignUpView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        data = request.data
        user = CustomUser.objects.filter(Q(email=data['email']) | Q(username=data['username']))
        if user:
            return Response({'message':'User with Email or Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = SignUpSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'Successfully Signed Up'}, status=status.HTTP_200_OK)
            else:
                return Response({'message':'Please fill all the fields'}, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        data = request.data
        try:
            user = authenticate(username=data['username'], password=data['password'])
            if user is not None:
                token = get_tokens_for_user(user)
                if user.is_superuser:
                    return Response({'message': 'Successfully Logged In', 'tokens': token, 'is_admin': True}, status=status.HTTP_202_ACCEPTED)
                else:
                    return Response({'message': 'Successfully Logged In', 'tokens':token, 'is_admin': False }, status=status.HTTP_202_ACCEPTED)
            else:
                return Response({'message': 'Invalid Credentials'}, status=status.HTTP_406_NOT_ACCEPTABLE)
        except:
            return Response({'message': 'Please fill all fileds'}, status=status.HTTP_400_BAD_REQUEST)