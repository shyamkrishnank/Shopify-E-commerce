from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


from .models import Cart, CartItems
from .serializers import *

class AddToCartView(APIView):
    def post(self,request):
        data = request.data
        print(data)
        cart, _ = Cart.objects.get_or_create(user=request.user)

        if CartItems.objects.filter(cart=cart, product=data['product']).exists():
            return Response({'message':'Product is already in cart'}, status=status.HTTP_200_OK)

        data['cart'] = cart.id
        data['quantity'] = 1
        print(data)
        serializer = CartItemSaveSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Item Added to Cart'}, status=status.HTTP_200_OK)
        print(serializer.errors)
        return Response({'message': 'Something went wrong'}, status=status.HTTP_400_BAD_REQUEST)


class UserCartView(APIView):
    def get(self,request):
        user = request.user
        try:
            cart = Cart.objects.get(user=user)
            cartitems = cart.cartitems.all()
            serializer = CartItemSerializer(cartitems,  many=True)
            total = cart.total_price
            return Response({'message':'success','cart':serializer.data,'cartTotal':total}, status=status.HTTP_200_OK)
        except:
            return Response({'message':'No Cart Yet','cart':"",'cartTotal':None}, status=status.HTTP_200_OK)




class AddQuantity(APIView):
    def post(self, request):
        data = request.data
        action = data['action']
        cartId = data['cartitem']
        cartitem = CartItems.objects.get(id=cartId)
        if action == 'add':
            if cartitem.product.stock == cartitem.quantity:
                return Response({'message': 'Stock Limit Exceeded'}, status=status.HTTP_400_BAD_REQUEST)
            if cartitem.quantity >= 5:
                return Response({'message': 'Product count exceeded'}, status=status.HTTP_400_BAD_REQUEST)
            cartitem.quantity += 1
        else:
            if cartitem.quantity == 1:
                return Response({'message': 'Min 1 item should be there'},status=status.HTTP_400_BAD_REQUEST)
            cartitem.quantity -= 1
        cartitem.save()
        cart = Cart.objects.get(id = cartitem.cart.id)
        print(cart.total_price)
        return Response({'message':'Success','total' : cart.total_price}, status=status.HTTP_200_OK)


class RemoveCartItemView(APIView):
    def get(self, request, id):
        cartitem = CartItems.objects.get(id = id)
        cartitem.delete()
        cart = Cart.objects.get(id = cartitem.cart.id)
        return Response({'message':'Product removed from cart','cartTotal':cart.total_price}, status=status.HTTP_200_OK)


    #Checkout Api

class CheckoutDetailsView( UserCartView, APIView):
    def get(self, request):
        productDetails = super().get(request)
        user_address = request.user.address
        productDetails.data['address'] = user_address
        return Response(productDetails.data, status=status.HTTP_200_OK)

#Ordering

class OrderConfirmView(APIView):
    def get(self, request):
        try:
            user = request.user
            cart = Cart.objects.get(user = request.user)
            data = {
                'user':user.id,
                 'total_price':cart.total_price
            }
            order_serializer = OrderSaveSerializer(data=data)
            if order_serializer.is_valid():
                order_serializer.save()
            cartItems = cart.cartitems.all()
            print(order_serializer.data)
            for item in cartItems:
                data = {
                    'order':order_serializer.data['id'],
                    'product':item.product.id,
                    'quantity':item.quantity
                }
                orderitem_serializer = OrderItemSerializer(data = data)
                if orderitem_serializer.is_valid():
                    orderitem_serializer.save()
            cartItems.delete()
            return Response({'message':'Order Confirmed Succesfully', 'order_num':order_serializer.data['order_num']}, status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response({'message':'Order Not Confirmed'}, status=status.HTTP_400_BAD_REQUEST)


class OrderUserSideView(APIView):
    def get(self, request):
        try:
            user = request.user
            order = Order.objects.filter(user = user).order_by('-created_at')
            serializer = OrderDetailsSerializer(order, many=True)
            return Response({'message':'success','orders':serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'message':'Sorry something went wrong'}, status=status.HTTP_400_BAD_REQUEST)


class OrderDetailedView(APIView):
    def get(self, request, id):
        order = Order.objects.get(id = id)
        serializer = OrderDetailsSerializer(order)
        print(serializer.data)
        return Response({'message':'success', 'order':serializer.data}, status=status.HTTP_200_OK)


class InvoiceView(OrderDetailedView,APIView):
    def get(self,request, id):
        orders = super().get(request,id)
        print(orders)















