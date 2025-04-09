from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth.models import User
from django.db import IntegrityError
from pymongo import MongoClient


client = MongoClient('mongodb://localhost:27017/')
db = client['clientdata']
collection = db['shopping']

@csrf_exempt
def register(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            email = data.get('email') + '@gmail.com'
            password = data.get('password')
            password_confirm = data.get('password_confirm')
            if password != password_confirm:
                return JsonResponse({'message': 'Passwords do not match'}, status=400)

            # Create new user
            try:
                single_document = {
                    "username": username,
                    "email": email,
                    "password": password
                }
                result = collection.insert_one(single_document)
                print(f"Inserted document ID: {result.inserted_id}")
                
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
            try:
                username = collection.find_one({'username': username})
                password = collection.find_one({'password': password})
                if username and password:
                    return JsonResponse({'message': 'User found'}, status=400)
                else:
                    return JsonResponse({'message': 'User not found'}, status=404)
                    
            except Exception as e:
                return JsonResponse({'message': str(e)}, status=500)

        except json.JSONDecodeError:
            return JsonResponse({'message': 'Invalid JSON data'}, status=400)
        except Exception as e:
            return JsonResponse({'message': str(e)}, status=500)