from django.urls import path
from .views import  MedicionMeasureView, getMedicionList, getMedicion, createMedicion
from . import views

urlpatterns = [
  path('medicion/',getMedicionList, name='medicion_list'),
  path('medicion/<int:pk>/', getMedicion, name='medicion'),
  path('medicion/create/', createMedicion, name='create_medicion'),
  path('medicion/measure/', MedicionMeasureView.as_view(), name='measure'),
  path('register', views.register_request, name='register'),
  path('login', views.login_request, name='login'),
  path('logout', views.logout_request, name='logout'),
]