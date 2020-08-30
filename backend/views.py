# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import JsonResponse
# Create your views here.


def test(request):
    return JsonResponse({"Test": 2})
