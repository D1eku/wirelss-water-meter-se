from django.urls import path
from .views import MedicionListView, MedicionDetailView

urlpatterns = [
  path('medicion/',MedicionListView.as_view(), name='medicion_list'),
  path('medicion/<int:pk>/', MedicionDetailView.as_view(), name='medicion'),
  path('medicion/create', MedicionDetailView.as_view(), name='create_medicion'),
]