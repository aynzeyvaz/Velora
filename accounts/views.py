# from django.shortcuts import render, redirect
# from django.contrib.auth.models import User
# from django.contrib.auth import authenticate, login, logout
# from .forms import SignupForm , LoginForm
from .models import Profile
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .serializers import SignupSerializer, LoginSerializer

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]

        token, created = Token.objects.get_or_create(user=user)

        return Response({
            "token": token.key,
            "message": "خوش آمدید"
        }, status=status.HTTP_200_OK)


class SignupView(APIView):
    def post(self, request):
        serializer = SignupSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        user = serializer.save()

        token, created = Token.objects.get_or_create(user=user)

        return Response({
            'token' : token.key,
            'message' : 'ثبت نام با موفقیت انجام شد'
        } , statu=status.HTTP_201_CREATED)






# def signup_view(request):
#     if request.method == 'POST':
#         form = SignupForm(request.POST)

#         if form.is_valid():
#             phone = form.cleaned_data['phone']
#             first_name = form.cleaned_data['first_name']
#             last_name = form.cleaned_data['last_name']
#             password = form.cleaned_data['password']

#             if User.objects.filter(username=phone).exists():
#                 form.add_error('phone' , 'این شماره قبلا ثبت شده است')
#             else:
#                 user = User.objects.create_user(
#                     username = phone,
#                     first_name=first_name,
#                     last_name=last_name,
#                     password = password
                    
#                 )

#                 Profile.objects.create(
#                     user=user,
#                     phone = phone
#                 )

#                 return redirect('login')
#     else:
#         form = SignupForm()

#     return render(request , 'accounts/signup.html' , {'form':form})


# def login_view(request):
#     if request.method == 'POST':
#         form = LoginForm(request.POST)
#         if form.is_valid():
#             phone = form.cleaned_data['phone']
#             password = form.cleaned_data['password']

#             user = authenticate(username=phone , password=password)

#             if user :
#                 login(request ,user)
#                 return redirect('Home')
#             else:
#                 form.add_error(None , 'شماره یا رمز اشتباه است')
#     else:
#         form = LoginForm()

#     return render(request , 'accounts/login.html' ,{'form':form})



# def logout_view(request):
#     logout(request)

#     return redirect('Home')



