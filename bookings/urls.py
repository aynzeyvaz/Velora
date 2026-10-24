from django.urls import path
from .views import *

urlpatterns = [
    path('bookings/<int:tour_id>/', BookingCreateAPI.as_view(), name='booking-list-create'),
]

