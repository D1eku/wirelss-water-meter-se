from telnetlib import STATUS
from measureWater import *
#from ..measureWater import measureWater
from django.shortcuts import render
from django.views import View
from .models import Medicion
from django.http import JsonResponse, HttpResponse
from django.forms.models import model_to_dict
from rest_framework.response import Response
from rest_framework.parsers import JSONParser 
from rest_framework import status
from .serializers import MedicionSerializer
from .forms import NewUserForm
from django.contrib import messages
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login, authenticate, logout
from django.core import serializers
import json

from django.views.decorators.csrf import csrf_exempt
# Create your views here.

def getMedicionList(request):
  print("Hello, Request is --> ")
  mList = list(Medicion.objects.values('address','value','measure_at')) 
  return JsonResponse({"mediciones":mList})



def getMedicion(request,pk):
  medicion = Medicion.objects.get(pk=pk)
  return JsonResponse(model_to_dict(medicion))

@csrf_exempt
def createMedicion(request):
  medicion_data = JSONParser().parse(request)
  medicion_serializer = MedicionSerializer(data = medicion_data)
  if medicion_serializer.is_valid():
    medicion_serializer.save()
    return JsonResponse(medicion_serializer.data, status=status.HTTP_201_CREATED)
  return JsonResponse(medicion_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MedicionMeasureView(View):
  def get(self,request):
    measure = measureWater()
    return HttpResponse(measure)


@csrf_exempt
def register_request(request):
  if request.method == "POST":
    form = NewUserForm(request.POST)
    print(request.POST)
    if form.is_valid():
      user = form.save()
      login(request,user)
      messages.success(request, "Registration successful." )
      print("Registration success")
      return HttpResponse('registrado')
    messages.error(request, "Unsuccessful registration. Invalid information.")
    print("Unsuccessful registration. Invalid information.")
    print(form.errors)
  form = NewUserForm()
  return HttpResponse('register falló x2, aquí debería esta redirigiendo.')

@csrf_exempt
def login_request(request):
  if request.method == "POST":
    print("llegue aquii")
    form = AuthenticationForm(request, data=request.POST)
    print("llego aqui x2")
    print(request)
    print(form.errors)
    if form.is_valid():
      print("llego aqui x3")
      username = form.cleaned_data.get('username')
      password = form.cleaned_data.get('password')
      print("llego aqui x4")
      user = authenticate(username=username, password=password)
      if user is not None:
        login(request, user)
        print(user)
        messages.info(request, f"You are now logged in as {username}.")
        return HttpResponse("Logueado")
      else:
        messages.error(request,"Invalid username or password.")
    else:
      messages.error(request,"Invalid username or password.")
  form = AuthenticationForm()
  return 'algo'

@csrf_exempt
def logout_request(request):
	logout(request)
	messages.info(request, "You have successfully logged out.") 
	return HttpResponse('a casa, redirigiendo...')