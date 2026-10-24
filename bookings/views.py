from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from tours.models import Tour
from .serializers import BookingSerializer


class BookingCreateAPI(APIView):
    def post(self, request, tour_id):
        permission_classes = [AllowAny]
        tour = Tour.objects.get(id=tour_id)


        serializer = BookingSerializer(data=request.data, context = {'request': request, 'tour':tour})


        if serializer.is_valid():

            serializer.save()

            return Response({"message": "درخواست رزرو شما ثبت شد. کارشناسان ما با شما تماس خواهند گرفت."})


        return Response(serializer.errors, status=400)