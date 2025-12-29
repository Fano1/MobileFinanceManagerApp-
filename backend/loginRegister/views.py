from django.shortcuts import redirect, render
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import login, logout, authenticate, decorators
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken


@api_view(['POST'])
def register(request):
    data = request.data

    recivedUsername = data.get('username')
    recivedPassword = data.get('password')
    recivedEmail = data.get('email')

    if (not recivedUsername) or (not recivedPassword):
        return Response(
            {"error": "The http response is an error"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    
    if User.objects.filter(username=recivedUsername).exists():
        return Response(
            {"error": "The username already exists"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    
    user = User.objects.create_user(
        username=recivedUsername,
        email=recivedEmail,
        password=recivedPassword
    )

    return Response(
        {"message": "User created successfully"},
        status=status.HTTP_201_CREATED
    )

#Token auth with JWT verification
@api_view(['POST'])
def loginUser(request):
    data = request.data
    recivedUsername = data.get('username')
    recivedPassword = data.get('password')

    user = authenticate(username=recivedUsername, password=recivedPassword)

    if not user:
        return Response(
            {"error": "The login failed"},
            status=status.HTTP_401_UNAUTHORIZED,

        )
    
    refresh = RefreshToken.for_user(user=user)
    
    return Response({
        "access": str(refresh.access_token),
        "refresh": str(refresh),
        "username": user.username
    }, status=status.HTTP_200_OK)

#protected endpoint me
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me(request):
    user = request.user
    return Response({
        "username": user.username,
        "name": user.first_name or user.username
    })
