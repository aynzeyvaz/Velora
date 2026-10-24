from django.contrib import admin
from .models import Booking


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'tour',
        'passengers',
        'total_price',
        'created_at',
    )
    list_filter = (
       'created_at',
    )
    search_fields = (
        'user__username',
        'tour__name',
    )
    ordering = ('-created_at',)