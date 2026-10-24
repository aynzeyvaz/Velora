from rest_framework import serializers
from .models import Booking


class BookingSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True)
    national_code = serializers.CharField(required=True)
    phone = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    passengers = serializers.IntegerField(required=True)

    class Meta:
        model = Booking
        fields = [
            'name',
            'national_code',
            'phone',
            'email',
            'passengers'
        ]

    def create(self, validated_data):
        request = self.context['request']
        tour = self.context['tour']
    
        user = request.user if request.user.is_authenticated else None
    
        passengers = validated_data['passengers']
    
        booking = Booking.objects.create(
            user=user,
            tour=tour,
            total_price=tour.price * passengers,
            **validated_data
        )
    
        return booking