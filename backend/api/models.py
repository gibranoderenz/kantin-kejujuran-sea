from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# reference for custom user model: https://www.youtube.com/watch?v=eCeRC7E8Z7Y

# Create your models here.
class AccountManager(BaseUserManager):
    def create_user(self, student_ID, username, password=None):
        if not student_ID:
            raise ValueError("Users must have an ID!")
        if not username:
            raise ValueError("Users must have a username!")
        
        user = self.model(
            student_ID=student_ID,
            username=username,
            password=password
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, student_ID, username, password=None):
        user = self.create_user(
            student_ID=student_ID,
            username=username,
            password=password
        )

        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class Account(AbstractBaseUser):
    student_ID = models.CharField(max_length=5, unique=True)
    # must-have fields in any CustomUser
    username = models.CharField(max_length=12)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'student_ID' # what the user will use for logging in; overrides default (username)
    REQUIRED_FIELDS = ['username']

    objects = AccountManager()

    def __str__(self):
        return self.student_ID

    # must-have in any CustomUser
    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

class Product(models.Model):
    name = models.CharField(max_length=30)
    seller = models.CharField(max_length=12, null=True)
    photo = models.ImageField(upload_to='images/', blank=True, null=True)
    description = models.TextField(max_length=255)
    price = models.PositiveBigIntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class StoreBalance(models.Model):
    balance = models.PositiveBigIntegerField(default=0)

    def __str__(self):
        return "Store Balance"
