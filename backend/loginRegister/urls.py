from django.urls import path
from .views import loginUser, register, me

urlpatterns = [
    path("register/", register, name="register"),
    path("login/", loginUser, name="login"),
    path("me/", me, name="me"),

]