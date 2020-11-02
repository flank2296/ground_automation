from django.conf.urls import url, include

from backend.views import *
from backend.bookings import *

urlpatterns = [
    url(r'^login/', login),
    url(r'^logout/', logout),
    url(r'^signup/', sign_up),
    url(r'^start_slot/', start_slot),
    url(r'^add_booking/', add_booking),
    url(r'^fetch_grounds/', fetch_grounds),
    url(r'^update_booking/', update_booking),
    url(r'^add_edit_ground/', add_edit_ground),
    url(r'^fetch_user_grounds/', fetch_user_grounds),
    url(r'^fetch_ground_bookings/', fetch_ground_bookings),
]