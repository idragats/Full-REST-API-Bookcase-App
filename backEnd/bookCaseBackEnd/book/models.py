from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Book(models.Model):
    title                   = models.CharField(max_length=100)
    author                  = models.CharField(max_length=100)
    genre                   = models.CharField(max_length=100)
    synopsis                = models.TextField()
    member                  = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
