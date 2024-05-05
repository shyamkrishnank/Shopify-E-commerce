from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import SportsCategorySerializer, CategorySerializer, ProductSerializer
from .models import SportsCategory, Category, Products


class GetSportsCategoryView(APIView):
    def get(self,request):
        sports = SportsCategory.objects.all()
        serializer = SportsCategorySerializer(sports, many=True)
        return Response({'sports':serializer.data}, status=status.HTTP_200_OK)

class AddSportsCategoryView(APIView):
    def post(self, request):
        data = request.data
        sport = SportsCategory.objects.filter(title = data['title'])
        if sport:
            return Response({'message':'Sport already Exists'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = SportsCategorySerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'Sport category added successfully','sport':serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'message':'Please fill all fields'}, status=status.HTTP_400_BAD_REQUEST)


class GetCategoryView(APIView):
    def get(self,request, id):
        try:
            sport = SportsCategory.objects.get(id = id)
            print(sport.categories)
            sportCategory = sport.categories.all()
            print(sportCategory)
            serializer = CategorySerializer(sportCategory, many=True)
            return Response({'message': 'Success','sport':sport.title, 'category':serializer.data}, status=status.HTTP_200_OK)
        except:
            return Response({'message':'Invalid Sports'}, status=status.HTTP_400_BAD_REQUEST)


class AddCategoryView(APIView):
    def post(self,request,id):
        data = request.data
        try:
            data['sport'] = id
            serializer = CategorySerializer(data = data)
            if serializer.is_valid():
                serializer.save()
                return Response({'message':'Category addedd successfully','category':serializer.data}, status=status.HTTP_200_OK)
            else:
                print(serializer.errors)
                return Response({'message':'Please check whether the data is proper'}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'message':'Invalid Sports'}, status=status.HTTP_400_BAD_REQUEST)


class GetProductsView(APIView):
    def get(self, request,id):
        try:
           category = Category.objects.get(id=id)
           products = category.products.all()
           serializer = ProductSerializer(products, many=True)
           return Response({"products":serializer.data,"category":category.title}, status=status.HTTP_200_OK)
        except Exception as e:
           print(e)
           return Response({'message':"Invalid Category"}, status=status.HTTP_400_BAD_REQUEST)


class AddProductView(APIView):
    def post(self,request, id):
        data = request.data
        data['category'] = id
        serializer = ProductSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":serializer.data,"product": serializer.data}, status=status.HTTP_200_OK)
        else:
            print(serializer.errors)
            return Response({'message': "Invalid Datas"}, status=status.HTTP_400_BAD_REQUEST)





