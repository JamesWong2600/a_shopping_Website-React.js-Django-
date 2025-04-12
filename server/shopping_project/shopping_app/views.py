from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth.models import User
from django.db import IntegrityError
from pymongo import MongoClient
from django.core.cache import cache
from django.conf import settings

client = MongoClient('mongodb://localhost:27017/')
db = client['clientdata']
collection = db['shopping']
shopping_cart = db['shopping_cart']

@csrf_exempt
def register(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            email = data.get('email') + '@gmail.com'
            password = data.get('password')
            password_confirm = data.get('password_confirm')
            ip = data.get('ip')
            if password != password_confirm:
                return JsonResponse({'message': 'Passwords do not match'}, status=400)

            # Create new user
            try:
                single_document = {
                    "username": username,
                    "email": email,
                    "password": password,
                    "shopping_cart": [] 
                }
                result = collection.insert_one(single_document)
                print(f"Inserted document ID: {result.inserted_id}")
                
                cache.set(f'{ip}', username, timeout=settings.CACHE_TIMEOUT)
                return JsonResponse({
                    'message': 'Registration successful',
                    'username': username
                }, status=201)

            except IntegrityError:
                return JsonResponse({
                    'message': 'Username already exists'
                }, status=400)

        except json.JSONDecodeError:
            return JsonResponse({'message': 'Invalid JSON data'}, status=400)
        except Exception as e:
            return JsonResponse({'message': str(e)}, status=500)
        
@csrf_exempt
def login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            ip = data.get('ip')
            cache.set(f'{ip}', username, timeout=settings.CACHE_TIMEOUT)
            try:
                username = collection.find_one({'username': username})
                password = collection.find_one({'password': password})
                if username and password:
                    return JsonResponse({'message': 'User found'}, status=201)
                else:
                    return JsonResponse({'message': 'User not found'}, status=201)
                    
            except Exception as e:
                return JsonResponse({'message': str(e)}, status=500)

        except json.JSONDecodeError:
            return JsonResponse({'message': 'Invalid JSON data'}, status=400)
        except Exception as e:
            return JsonResponse({'message': str(e)}, status=500)
        

@csrf_exempt
def add_shopping_cart(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            #username = data.get('username')
            #email = data.get('email') + '@gmail.com'
            #password = data.get('password')
            item_name = data.get('item_name')
            price = data.get('price')
            ip= data.get('ip')
            username = cache.get(ip)
            if not username:
               return JsonResponse({'message': 'not logined'}, status=400)

            #username = collection.find_one({'username': username})
            # Create new user
            try:
                print(f"Username from cache: {username}")
                new_item = {
                    "name": item_name,
                    "price": price,
                    "amount": 1
                }

                #if not username:
                       #result = collection.insert_one(single_document)
                collection.update_one({'username': username},{"$push": {"shopping_cart": new_item}})
                
                return JsonResponse({
                    'message': 'added successful',
                }, status=201)

            except IntegrityError:
                return JsonResponse({
                    'message': 'Username already exists'
                }, status=400)

        except json.JSONDecodeError:
            return JsonResponse({'message': 'Invalid JSON data'}, status=400)
        except Exception as e:
            return JsonResponse({'message': str(e)}, status=500)