from django.db import models
from django.conf import settings
from tours.models import Tour
from django.core.validators import MinValueValidator

# Create your models here.

class Booking(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='bookings', null=True, blank=True) 
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE, related_name='bookings')
    name = models.CharField(max_length=100, null=True, blank=True)
    national_code = models.CharField(max_length=50, null=True, blank=True)
    phone = models.CharField(max_length=50, null=True, blank=True)
    passengers = models.PositiveIntegerField(validators=[MinValueValidator(1)] )
    email = models.EmailField( max_length=254, null=True, blank=True)
    total_price = models.DecimalField(max_digits=15, decimal_places=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Booking by {self.user} for {self.tour}"

    

