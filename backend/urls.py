from django.conf.urls import url, include

from backend.views import *

urlpatterns = [
    url(r'^test/', test),
]
