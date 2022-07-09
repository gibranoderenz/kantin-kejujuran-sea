from django.urls import path
from . import views

urlpatterns = [
    path('kantin/', views.ProductList.as_view()),
    path('kantin/<int:pk>/', views.ProductDetail.as_view()),
    path('kotak-uang/', views.StoreBalanceDetail.as_view()),
    path('register/', views.RegisterUser.as_view()),
    path('login/', views.LoginUser.as_view()),
    path('logout/', views.LogoutUser.as_view()),
    path('get-user/', views.CheckAuth.as_view()),
]