from django.contrib import admin
from django.urls import path
from shopping_app import views

urlpatterns = [
    path('register', views.register, name='register'),
    path('login', views.login, name='login'),
    path('add_to_cart', views.add_shopping_cart, name='add_to_cart'),
]
