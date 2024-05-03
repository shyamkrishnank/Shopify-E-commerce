from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import SportsCategorySerializer
from .models import SportsCategory


class GetSportsCategory(APIView):
    def get(self,request):
        sports = SportsCategory.objects.all()
        serializer = SportsCategorySerializer(sports, many=True)
        return Response({'sports':serializer.data}, status=status.HTTP_200_OK)

class AddSportsCategory(APIView):
    def post(self, request):
        data = request.data
        serializer = SportsCategorySerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'Sport category added successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'message':'Please fill all fields'}, status=status.HTTP_400_BAD_REQUEST)


class AddCategory(APIView):
    def post(self,request):
        pass