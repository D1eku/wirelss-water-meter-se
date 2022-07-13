from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from celery import shared_task
# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'medicionesAPIProject.settings')

app = Celery('medicionesAPIProject')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.

app.config_from_object('django.conf:settings', namespace='CELERY')


# Load task modules from all registered Django app configs.
app.autodiscover_tasks()


@shared_task(name = "print_msg_main")
def print_message(message):
  print(f"Celery is working!! Message is {message}")

app.conf.beat_schedule = {
    #Scheduler Name
    'print-message-ten-seconds': {
        # Task Name (Name Specified in Decorator)
        'task': 'print_msg_main',  
        # Schedule      
        'schedule': 10.0,
        # Function Arguments 
        'args': ("Chupala ekukaeeeeee",) 
    },

} 