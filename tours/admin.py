from django.contrib import admin 
from .models import *
# Register your models here.


@admin.register(HeroSection)
class HeroSectionAdmin(admin.ModelAdmin):
    list_display = ('title', 'image')
    search_fields = ('title', 'subtitle')



@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ('name' , )
    search_fields = ('name' , )


@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = ('name', 'country')
    search_fields = ('name', 'country')

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('title', "image" )
    search_fields = ("title",)

class TourImageInline(admin.TabularInline):
    model = TourImage
    extra = 3

class ItineraryInline(admin.TabularInline):
    model = Itinerary
    extra = 3

    formfield_overrides = {
        models.TextField: {
            'widget': admin.widgets.AdminTextareaWidget(
                attrs={
                    'rows': 2,
                    'cols': 25
                }
            )
        }
    }

@admin.register(Tour)
class TourAdmin(admin.ModelAdmin):
    inlines = [TourImageInline, ItineraryInline ]
    list_display = (
        'origin',
        'destination',
        'price',
        'badge',
        'capacity',
        'is_featured',
        'is_active',
    )

    list_filter = (
        'is_featured',
        'is_active',
        'destination',
    )

    search_fields = (
        'origin__name',
        'destination__name',
    )

    ordering = ('-id',)


@admin.register(PopularDestination)
class PopularDestinationAdmin(admin.ModelAdmin):
    list_display = ('city', 'image')
    search_fields = ('city__name',)


class HotelImageInline(admin.TabularInline):
    model = HotelImage
    extra = 3

class FeatureInline(admin.TabularInline):
    model = HotelFeature
    extra = 3

class FacilityInline(admin.TabularInline):
    model = HotelFacility
    extra = 3

@admin.register(Hotel)
class HotelAdmin(admin.ModelAdmin):
    inlines = [HotelImageInline, FeatureInline, FacilityInline]
    list_display = ('title', 'city', 'stars')
    list_filter = ('city', 'stars')
    search_fields = ('title',)

@admin.register(FlightSchedule)
class FlightScheduleAdmin(admin.ModelAdmin):
    list_display = ('airline', 'origin', 'destination', )
    
