from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate

from authApp.token import get_tokens_for_user

class AdminLoginView(APIView):
    def post(self, request):
        data = request.data
        try:
            user = authenticate(username=data['username'], password=data['password'])
            if user is not None:
                if user.is_superuser:
                    token = get_tokens_for_user(user)
                    return Response({'message': 'Successfully Logged In', 'tokens': token}, status=status.HTTP_202_ACCEPTED)
                else:
                    return Response({'message':'Invalid credentials'}, status=status.HTTP_406_NOT_ACCEPTABLE)
            else:
                return Response({'message': 'Invalid Credentials'}, status=status.HTTP_406_NOT_ACCEPTABLE)
        except:
            return Response({'message':'Please fill all fileds'}, status=status.HTTP_400_BAD_REQUEST)



