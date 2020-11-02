# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from django.contrib import admin

from django.contrib.auth.models import User

User._meta.get_field('email')._unique = True

class BaseModel(models.Model):
    ''' Base models for adding dates (Used as a parent model for all the models) '''
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class ground(BaseModel):
    ''' Stores information about the ground '''
    name = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    contact = models.CharField(max_length=10)
    email = models.CharField(max_length=50)
    address = models.CharField(max_length=500)
    is_closed = models.IntegerField(default=0)
    is_active = models.IntegerField(default=0)
    week_day_rate = models.CharField(max_length=50, default="0.0")
    week_end_rate = models.CharField(max_length=50, default="0.0")
    is_disable = models.IntegerField(default=0)
    slot_duration = models.IntegerField(default=60)

    class Meta:
        db_table = 'ground'
    
    def __str__(self):
        return self.name 

    @classmethod
    def fetch_grounds(cls):
        return cls.objects.all()
    
    @classmethod
    def fetch_user_grounds(cls):
        return cls.objects.filter(is_disable=0, is_closed=0)
        

class bookings(BaseModel):
    ''' Stored information about the booking '''
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    ground = models.ForeignKey(ground, on_delete=models.DO_NOTHING)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    is_approved = models.IntegerField(default=0)

    class Meta:
        db_table = 'bookings'

    @classmethod
    def get_ground(cls, id):
        try:
            return cls.objects.get(id=id)
        except:
            raise Exception("Invalid Ground Id")

    @classmethod
    def get_all_booking(cls, id, start_date, end_date):
        ''' used for fetching all bookings of a ground for a date '''
        try:
            return cls.objects.filter(ground_id=id, start_time__range=(start_date, end_date))
        except Exception as e:
            print(e)
            return []

admin.site.register(ground)
admin.site.register(bookings)