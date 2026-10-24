from django.urls import path
from . import views


urlpatterns = [
    path('' , views.tour_list, name='Home'),
    path('search/', views.tour_search, name='search'),
    path("details/", views.detail_page),
    path('api/home/hero/', views.HomeHeroSectionAPI.as_view(), name='home_herosection'),
    path('api/tours/special/', views.SpecialTourListAPI.as_view(),  name='tours_api'),
    path('api/destinations/', views.DestinationListAPI.as_view(),     name='destination_list'),
    path('api/tours/', views.TourListAPI.as_view(), name='tour_list_api'),
    path('api/tours/popular/', views.PopularDestinationAPI.as_view(), name='popular_destinations_api'),
    path('api/search/hero/', views.SearchHeroSectionAPI.as_view(),      name='hero_section_images'),
    path('api/search/result/', views.SearchAPI.as_view(),           name='search_result'),
    path('api/tour/<int:pk>/', views.TourDetailAPI.as_view(),       name='tour_detail'),
    path('api/tour/hero/<int:pk>', views.DetailHeroSectionAPi.as_view(), name='tour_detail_herosection'),
    path('api/tour/itinerary/<int:pk>', views.ItineraryDetailAPI.as_view(), name="itinerary"),
    path('api/hotel/<int:pk>', views.HotelAPI.as_view(), name='hotel'),
    path('api/flight/<int:pk>', views.FlightAPI.as_view(), name='flight')
]

