from django.contrib.auth.models import User
from django.db import models

# Create your models here.
class Task(models.Model):
    class Status(models.TextChoices):
        P = 'P', 'Pending'
        A = 'A', 'Approved'
        F = 'F', 'Failed'
        C = 'C', 'Cancelled'
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    task_id = models.CharField(max_length=255,
                               null=True,
                               blank=True)
    status = models.CharField(max_length=1,
                              choices=Status.choices,
                              default=Status.P)
    matrix = models.JSONField()
    vector = models.JSONField()
    result = models.JSONField(null=True,
                              blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    