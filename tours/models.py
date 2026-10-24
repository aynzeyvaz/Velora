from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator



class HeroSection(models.Model):
    image = models.URLField(max_length=500)
    title = models.CharField(max_length=100, null=True, blank=True)
    subtitle = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.image
    


class Country(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name
    

class City(models.Model):
    name = models.CharField(max_length=50)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)

    def __str__(self):
        return self.name



class Category(models.Model):
    title = models.CharField(max_length=50)
    image = models.URLField(max_length=500)

    def __str__(self):
        return self.title

    

class Tour(models.Model):
    class Badge(models.TextChoices):
        FEATURED = 'featured', 'ویژه',
        POPULAR = 'popular', 'محبوب',
        ECONOMY = 'economy', 'اقتصادی'

    origin = models.ForeignKey(City, on_delete=models.CASCADE , related_name='origin') #on_delete=models.PROTECT
    destination = models.ForeignKey(City, on_delete=models.CASCADE , related_name='destination') #on_delete=models.PROTECT
    subtitle = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField()
    badge = models.CharField(max_length=30, choices=Badge.choices , blank=True , null=True)
    # cover = models.ImageField(upload_to = 'tours/cover')
    cover = models.URLField(max_length=500) #for deploy
    start_date = models.DateField()
    duration = models.PositiveIntegerField()
    price = models.PositiveIntegerField()
    capacity = models.PositiveIntegerField()
    meals = models.CharField(max_length=50, null=True, blank=True)
    hotel = models.ForeignKey("Hotel",on_delete=models.PROTECT, null=True, blank=True)
    flight = models.ForeignKey("FlightSchedule", on_delete=models.PROTECT, related_name='tours', null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.PROTECT, null=True, blank=True)
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    @property
    def remaining_capacity(self):
        booked = self.bookings.aggregate(total=models.Sum('passengers'))['total'] or 0
        return self.capacity - booked

    def __str__(self):
        return f"{self.destination} - {self.duration} روزه - ({self.id})"
    


class TourImage (models.Model):
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE, related_name='images')
    # images = models.ImageField(upload_to='tours/gallery')
    image = models.URLField(max_length=500) #for deploy


    
class PopularDestination(models.Model):
    city = models.OneToOneField(City, on_delete=models.CASCADE, related_name='popular_destination')
    image = models.URLField(max_length=500)

    def __str__(self):
        return self.city.name


class Itinerary(models.Model):
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE, related_name='itineraries')
    day = models.PositiveIntegerField()
    title = models.CharField(max_length=100)
    description = models.TextField()

    class Meta:
        ordering = ['day']

class Hotel(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    address = models.CharField(max_length=250)
    stars = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])

    def __str__(self):
        return self.title
    


class HotelImage(models.Model):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name='images', null=True, blank=True)
    image = models.URLField( max_length=400)

class HotelFeature(models.Model):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name='features')
    title = models.CharField(max_length=150)

class HotelFacility(models.Model):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name='facilities')
    icon = models.CharField( max_length=100)
    title = models.CharField(max_length=100)


class FlightSchedule(models.Model):
    origin = models.ForeignKey(City, on_delete=models.CASCADE , related_name='departing_flights')
    destination = models.ForeignKey(City, on_delete=models.CASCADE , related_name='arriving_flights')
    departure_date = models.DateField(auto_now=False, auto_now_add=False)
    departure_time = models.TimeField(auto_now=False, auto_now_add=False)
    arrival_date = models.DateField(auto_now=False, auto_now_add=False)
    arrival_time= models.TimeField(auto_now=False, auto_now_add=False)
    airline = models.CharField(max_length=100)
    number = models.CharField( max_length=50)
