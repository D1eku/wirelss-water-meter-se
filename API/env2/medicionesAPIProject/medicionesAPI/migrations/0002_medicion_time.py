# Generated by Django 4.0.5 on 2022-07-13 17:41

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('medicionesAPI', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='medicion',
            name='time',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]