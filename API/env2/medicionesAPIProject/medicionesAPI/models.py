from django.db import models

class Medicion(models.Model):
  address = models.CharField(max_length=200)
  value = models.CharField(max_length=200)
  measure_at = models.DateField()
