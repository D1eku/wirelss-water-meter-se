from rest_framework import serializers 
from .models import Medicion
 
 
class MedicionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicion
        fields = ('id',
                  'address',
                  'value',
                  'measured_at')