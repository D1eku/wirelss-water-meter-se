from telnetlib import STATUS
from measureWater import *
from django.shortcuts import render
from django.views import View
from .models import Medicion
from django.http import JsonResponse, HttpResponse
from django.forms.models import model_to_dict
from rest_framework.response import Response
from rest_framework.parsers import JSONParser 
from rest_framework import status
from .serializers import MedicionSerializer

# Create your views here.
class MedicionListView(View):
  def get(self, request):
    print("Hello, Request is --> ")
    mList = Medicion.objects.all()
    return HttpResponse('Hello HttpResponse')

class MedicionDetailView(View):
  def get(self, request,pk):
    medicion = Medicion.objects.get(pk=pk)
    return JsonResponse(model_to_dict(medicion))


  def post(self, request):
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
