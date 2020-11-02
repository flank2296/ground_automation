# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2020-10-10 07:33
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_bookings'),
    ]

    operations = [
        migrations.AddField(
            model_name='bookings',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='bookings',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='ground',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='ground',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
