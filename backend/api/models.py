from django.db import models
from django.contrib.auth.models import User


class userAccount(models.Model):

    userName = models.ForeignKey(User, on_delete=models.CASCADE)
    _balance = models.FloatField(default=0.0)
    created = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user

class Transaction(models.Model):
    SenderAccount = models.ForeignKey(userAccount, on_delete=models.CASCADE, related_name="sent")
    ReciverAccount = models.ForeignKey(userAccount, on_delete=models.CASCADE, related_name="recived")

    transactionAmount = models.FloatField(default=0)
    transactionDate = models.DateTimeField(auto_now=True)

    fraudDetection = models.BooleanField(default=False)
