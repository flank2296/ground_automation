# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import json
from django.shortcuts import render
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST, require_GET
from django.http import JsonResponse, HttpResponse, HttpResponseForbidden

from backend.function import *
from backend.models import ground, bookings
from backend.decorators import session_required
from backend.serializers import *


@require_POST
@login_required
def add_edit_ground(request):
    ''' Used for adding or updating a ground '''
    try:
        args = request.POST.dict()
        ground_id = args.get('id')
        ground_args = { key: val for key, val in args.items() if key != 'id' }
        if ground_id:
            ground_args.update({ "id": ground_id })

        ground_obj = ground() if not ground_id else ground.objects.get(id=ground_id)
        [setattr(ground_obj, key, val) for key, val in ground_args.items()]
        ground_obj.save()
        return JsonResponse(groundSerializers(ground_obj).data)
    except Exception as e:
        return HttpResponseForbidden(e)


@require_POST
@login_required
def add_booking(request):
    ''' Used for booking a ground slot '''
    try:
        args = request.POST.dict()
        user = request.user
        ground_id = args.get('id')
        start_time = args.get('start_time')
        end_time = args.get('end_time')


        if not all([ground_id, start_time, end_time]):
            raise Exception("Invalid payload")

        bookings(
            user=user,
            end_time=end_time,
            ground_id=ground_id,
            start_time=start_time,
            is_approved=1
        ).save()
        booking = bookings.objects.last()
        return JsonResponse(custombookingsSerializers(booking).data, safe=False)
    except Exception as e:
        return HttpResponseForbidden(e)


@require_POST
@login_required
def update_booking(request):
    ''' Used for booking a ground slot '''
    try:
        args = request.POST.dict()
        user = request.user
        booking_id = args.get('booking_id')
        ground_id = args.get('ground_id')
        start_time = args.get('start_time')
        end_time = args.get('end_time')

        if not all([booking_id, ground_id, start_time, end_time]):
            raise Exception("Invalid payload")

        # Ankush convert dates here        
        bookings(
            id=booking_id,
            user=user,
            end_time=end_time,
            ground_id=ground_id,
            start_time=start_time,
        ).save()
        return HttpResponse("Success")
    except Exception as e:
        return HttpResponseForbidden(e)


@require_POST
@login_required
def approve_booking(request):
    ''' Used for booking a ground slot '''
    try:
        args = request.POST.dict()
        booking_id = args.get('booking_id')
        if not all([booking_id]):
            raise Exception("Invalid payload")    

        bookings(id=booking_id, is_approved=1).save()
        return HttpResponse("Success")
    except Exception as e:
        return HttpResponseForbidden(e)


@require_POST
@login_required
def start_slot(request):
    ''' Used for booking a ground slot '''
    try:
        args = request.POST.dict()
        booking_id = args.get('id')
        if not all([booking_id]):
            raise Exception("Invalid payload")    

        booking = bookings.get_booking(booking_id)
        ground = booking.ground
        ground.is_active = True
        ground.save()
        return JsonResponse(custombookingsSerializers(booking), safe=False)
    except Exception as e:
        return HttpResponseForbidden(e)


@require_GET
@login_required
def fetch_grounds(request):
    ''' Used for fetching all ground list '''
    try:
        grounds = ground.fetch_grounds()
        return JsonResponse(groundSerializers(grounds, many=True).data, safe=False)
    except Exception as e:
        return HttpResponseForbidden(e)


@require_GET
@login_required
def fetch_user_grounds(request):
    ''' Used for fetching all ground list '''
    try:
        grounds = ground.fetch_user_grounds()
        return JsonResponse(groundSerializers(grounds, many=True).data, safe=False)
    except Exception as e:
        return HttpResponseForbidden(e)


@require_POST
@login_required
def fetch_ground_bookings(request):
    ''' Used for fetching all ground list '''
    try:
        args = request.POST.dict()
        ground_id = args.get('id')
        start_date = args.get("start_date")
        end_date = args.get("end_date")
        if not ground_id:
            return HttpResponseForbidden("No ground id found")
        _bookings = bookingsSerializers(bookings.get_all_booking(ground_id, start_date, end_date), many=True)
        return JsonResponse(_bookings.data, safe=False)
    except Exception as e:
        print(e)
        return HttpResponseForbidden(e)