from rest_framework import serializers
from .models import *
from .services import get_destinations

class HomeHeroSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroSection
        fields = ['image', 'title', 'subtitle']


class TourSerializer(serializers.ModelSerializer):
    country     = serializers.CharField(source='destination.country.name')
    city        = serializers.CharField(source='destination.name')
    startDate   = serializers.DateField(source='start_date')
    duration    = serializers.IntegerField()
    badge       = serializers.CharField(source='get_badge_display')
    price       = serializers.IntegerField()
    remaining_capacity = serializers.IntegerField()


    class Meta:
        model  = Tour
        fields = ['id', 'cover', 'country', 'city', 'startDate', 'duration','badge', 'price', 'remaining_capacity']

class DestinationsSerializer(serializers.ModelSerializer):
    options = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'title', 'image', 'options']

    def get_options(self, obj):
        if obj.title == "خارجی":
            return get_destinations(obj, country=True)

        return get_destinations(obj, country=False)
        

class PopularDestinationSerializer(serializers.ModelSerializer):
    city = serializers.CharField(source='city.name')
    tour_count = serializers.IntegerField()

    class Meta:
        model = PopularDestination
        fields = ['city', 'image','tour_count']

class SearchHeroSectionSerializer(serializers.Serializer):
    destination = serializers.CharField(allow_null = True)
    heroImages  = serializers.ListField(child=serializers.URLField())



class SearchSerializer(serializers.ModelSerializer):
    country    = serializers.CharField(source='destination.country.name')
    city       = serializers.CharField(source='destination.name')
    startDate  = serializers.DateField(source='start_date')
    duration   = serializers.IntegerField()
    badge      = serializers.CharField(source='get_badge_display')
    price      = serializers.IntegerField()
    remaining_capacity = serializers.IntegerField()

    
    class Meta:
        model  = Tour
        fields = ['id', 'cover', 'country', 'city', 'startDate', 'duration','badge', 'price', 'remaining_capacity']


class TouImageSerializer(serializers.ModelSerializer):

    class Meta:
        model  = TourImage
        fields = ['image']


class TourDetailSerializer(serializers.ModelSerializer):
    country     = serializers.CharField(source='destination.country.name')
    city        = serializers.CharField(source='destination.name')
    remaining_capacity = serializers.IntegerField()
    badge      = serializers.CharField(source='get_badge_display')


    class Meta:
        model  = Tour
        fields = ['id','subtitle','description', 'country', 'city', 'start_date', 'duration', 'badge', 'meals', 'price', 'remaining_capacity']


class DetailheroSerializer(serializers.ModelSerializer):
    images      = TouImageSerializer(many=True, read_only=True)

    class Meta:
        model = Tour
        fields = ['id', 'badge', 'images']

class ItinerarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Itinerary
        fields = ['day', 'title', 'description']

class HotelImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HotelImage
        fields = ['image']

class HotelLocationSerializer(serializers.ModelSerializer):
    country = serializers.CharField(source='country.name')
    city = serializers.CharField(source='city.name')

    class Meta:
        model = Hotel
        fields = ['country','city', 'address']


class HotelFacilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = HotelFacility
        fields = ['icon', 'title']

class HotelSerializer(serializers.ModelSerializer):
    location = HotelLocationSerializer(source='*')
    images = HotelImageSerializer(many=True, read_only=True)
    features = serializers.SerializerMethodField()
    facilities = HotelFacilitySerializer(many=True, read_only=True)

    def get_features(self, obj):
        return obj.features.values_list('title', flat=True)

    
    class Meta:
        model = Hotel
        fields = ['title', 'description', 'location', 'stars', 'features', 'facilities', 'images']


class DpartureDatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlightSchedule
        fields = ['departure_date', 'departure_time', 'arrival_date', 'arrival_time']

class DepartureFlightSerializer(serializers.ModelSerializer):
    origin = serializers.CharField(source='destination.name')
    destination = serializers.CharField(source='origin.name')
    class Meta:
        model = FlightSchedule
        fields = ['departure_date','departure_time', 'origin', 'destination', 'airline', 'number' ]

class ArrivalFlightSerializer(serializers.ModelSerializer):
    origin = serializers.CharField(source='destination.name')
    destination = serializers.CharField(source='origin.name')
    class Meta:
        model = FlightSchedule
        fields = ['arrival_date', 'arrival_time', 'origin', 'destination', 'airline', 'number' ]


class FlightSerializer(serializers.ModelSerializer):
    dates = DpartureDatesSerializer(source='*')
    departure_flight = DepartureFlightSerializer(source='*')
    arrival_flight = ArrivalFlightSerializer(source='*')

    class Meta:
        model = FlightSchedule
        fields = ['dates', 'departure_flight', 'arrival_flight']

