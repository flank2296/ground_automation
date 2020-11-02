# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import json
from django.shortcuts import render
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST, require_GET
from django.http import JsonResponse, HttpResponse, HttpResponseForbidden
from django.contrib.auth import authenticate, login as core_login, logout as core_logout

from backend.function import *


@require_POST
@csrf_exempt
def login(request):
	''' Used for logging in '''
	args = request.POST.dict()
	username = args.get('username')
	password = args.get('password')
	user = authenticate(username=username, password=password)
	if not user:
		HttpResponseForbidden('Invalid Username or password')
	core_login(request, user)
	return JsonResponse({"session": prepare_session(user)})


def logout(request):
	''' Used for logging out '''
	try:
		core_logout(request)
		return JsonResponse({"message": "Successfully logged out"})
	except Exception as e:
		return HttpResponseForbidden(e)


@require_POST
def sign_up(request):
	''' Used for sign up '''
	try:
		args = request.POST.dict()
		username = args.get("username")
		password = args.get("password")
		user = User.objects.create_user(username=username, email=username, password=password)
		user.first_name = args.get("firstname", "")
		user.last_name = args.get("lastname", "")
		user.save()
		return HttpResponse("User created successfully!")
	except Exception as e:
		return HttpResponseForbidden(e)