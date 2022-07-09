from django.http import Http404
from rest_framework.response import Response
from django.contrib.auth import login, logout
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework import generics
from .models import Product, StoreBalance
from .serializers import ProductSerializer, StoreBalanceSerializer, RegisterUserSerializer

# reference: https://www.django-rest-framework.org/tutorial/3-class-based-views/
class ProductList(APIView):
    """
    List all products, or sell a new product.
    """
    parser_classes = (MultiPartParser, FormParser)
    # only authenticated users can read and write; others only can read
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, request, format=None):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True, context={'request': request})
        return Response(serializer.data)

    def put(self, request, format=None):
        order_by = request.data['order_by']
        products = Product.objects.all().order_by(order_by)
        serializer = ProductSerializer(products, many=True, context={'request': request})
        return Response(serializer.data)
    
    def post(self, request, format=None):
        serializer = ProductSerializer(data=request.data, many=False, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # allows unauthenticated users to still make a PUT request (for sorting feature)
    def get_permissions(self):
        if self.request.method != 'POST':
            return []
        return super().get_permissions()

class ProductDetail(APIView):
    """
    Retrieve, update or delete a product instance.
    """
    permission_classes = (IsAuthenticated,)
    def get_product(self, pk):
        try:
            return Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        product = self.get_product(pk)
        serializer = ProductSerializer(product)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        product = self.get_product(pk)
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        product = self.get_product(pk)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class StoreBalanceDetail(APIView):
    permission_classes = (IsAuthenticated, )
    def get(self, request, format=None):
        store_balance = StoreBalance.objects.get(pk=1)
        serializer = StoreBalanceSerializer(store_balance, many=False, context={'request': request})
        return Response(serializer.data)

    def put(self, request, format=None):
        store_balance = StoreBalance.objects.get(pk=1)
        serializer = StoreBalanceSerializer(store_balance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegisterUser(generics.CreateAPIView):
    serializer_class = RegisterUserSerializer

class LoginUser(ObtainAuthToken):
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'student_ID': user.student_ID,
            'username': user.username,
        }, status=status.HTTP_200_OK)

class CheckAuth(APIView):
    def get(self, request, format=None):
        if request.user.is_authenticated:
            user = request.user
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'student_ID': user.student_ID,
                'username': user.username
            }, status=status.HTTP_200_OK)
        return Response({'message' : 'No user logged in'}, status=status.HTTP_204_NO_CONTENT)

# reference: https://medium.com/geekculture/register-login-and-logout-users-in-django-rest-framework-51486390c29
class LogoutUser(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request, format=None):
        user = request.user
        user.auth_token.delete()
        logout(request)
        return Response({'message': 'Log out success'}, status=status.HTTP_200_OK)