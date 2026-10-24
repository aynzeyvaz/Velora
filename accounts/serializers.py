from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile
from django.contrib.auth import authenticate


class LoginSerializer(serializers.Serializer):
    phone = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        phone = data.get("phone")
        password = data.get("password")

        if not phone.isdigit():
            raise serializers.ValidationError("شماره تلفن نامعتبر است")

        user = authenticate(username=phone, password=password)

        if not user:
            raise serializers.ValidationError("شماره یا رمز اشتباه است")

        data["user"] = user
        return data



class SignupSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length=50, error_messages={
                                                                'required':'نام خود رو وارد کنید',
                                                                'blank':'نام خود را وارد کنید'})

    last_name  = serializers.CharField(max_length=50, error_messages={
                                                                'required':'نام خانوادگی خود را وارد کنید',
                                                                'blank':'نام خانوادگی خود ار وارد کنید'})
                                                                
    phone      = serializers.CharField(max_length=11, error_messages={
                                                                'required':'شماره تلفن خود را وارد کنید',
                                                                'blank':'شماره تلفن خود را وارد کنید'})

    password   = serializers.CharField(write_only=True, min_length=8, error_messages={
                                                                'required':' رمز عبور خود را وارد کنید',
                                                                'blank':'رمز عبور خود را وارد کنید',
                                                                'min_length':'رمز عبور باید شامل 8 کاراکتر باشد'})

    def validate_phone(self, value):
        if not value.isdigit():
            raise serializers.ValidationError('شماره تلفن فقط باید شامل عدد باشد')

        if len(value) != 11:
            raise serializers.ValidationError('شماره تلفن باید 11 رقم باشد')
        
        if not value.startswith('09'):
            raise serializers.ValidationError('شماره تلفن نامعتبر است')

        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError('این شماره تلفن قبلا ثبت شده است')

        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["phone"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            password=validated_data["password"],
        )

        Profile.objects.create(
            user=user,
            phone=validated_data["phone"]
        )

        return user
        
