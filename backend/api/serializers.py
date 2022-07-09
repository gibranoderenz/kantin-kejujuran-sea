from rest_framework import serializers
from .models import Product, StoreBalance, Account

class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['student_ID', 'username', 'password']
    
    def create(self, validated_data):
        user = Account.objects.create(
            student_ID=validated_data['student_ID'],
            username=validated_data['username'],
            )
        user.set_password(validated_data['password'])
        user.save()
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['student_ID', 'username']
        
class ProductSerializer(serializers.ModelSerializer):
    photo = serializers.ImageField(required=True)
    class Meta:
        model = Product
        fields = ['id', 'name', 'seller', 'photo', 'description', 'price', 'created', 'updated']

class StoreBalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoreBalance
        fields = '__all__'