from .models import Tour , TourImage
from django.db.models import Q, F
from datetime import datetime
import jdatetime

def hero_section(destination=None):
    tours = Tour.objects.filter(is_active=True)

    if destination:
        tours = tours.filter(
            Q(destination__name__icontains=destination) |
            Q(destination__country__name__icontains=destination)
                    )
    else:
        tours = tours.filter(is_featured=True)


    images = TourImage.objects.filter(tour__in=tours).values_list("image" , flat=True)[:5]
    return list(images)



def search_result(origin, destination,  month, sort):
    if not origin and not destination and not month:
        return Tour.objects.none() , 0

    tours = Tour.objects.filter(is_active=True)

    if origin:
        tours = tours.filter(origin__name__icontains = origin)

    if destination:
        tours = tours.filter(
            Q(destination__name__icontains=destination) |
            Q(destination__country__name__icontains=destination)
                    )

    if month:
        try:
            month = int(month)
            year = jdatetime.datetime.now().year

            start_date = jdatetime.datetime(year, month, 1)

            if month <= 6:
                end_date = jdatetime.datetime(year, month, 31)
            elif month <= 11:
                end_date = jdatetime.datetime(year, month, 30)
            else:
                end_date = jdatetime.datetime(year, month, 29)

            jalali = jdatetime.date(year, month, end_date.day)

            gregorian_start = start_date.togregorian()
            gregorian_end = jalali.togregorian()

            tours = tours.filter(start_date__range=(gregorian_start, gregorian_end))
            
        except ValueError:
            pass

    elif sort == "cheap":
        tours = tours.order_by('price')

    elif sort == "expensive":
        tours = tours.order_by('-price')

    elif sort == "nearest":
        tours = tours.order_by('start_date')

    elif sort == "longest":
        tours = tours.order_by('-duration')

    elif sort == "shortest":
        tours = tours.order_by('duration')
    
    elif sort == "default":
        tours = tours.order_by('start_date')

    count = tours.count()

    return tours, count
    

def get_destinations(category, country=False):
    tours = Tour.objects.filter(category=category)

    if country:
        destinations = tours.values_list('destination__country__name',flat=True).distinct()
    else:
        destinations = tours.values_list('destination__name',flat=True).distinct()

    return destinations