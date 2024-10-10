from django.contrib.auth.models import User
from django.db import models

# Create your models here.
class History(models.Model):
    class StatusChoices(models.TextChoices):
        PENDING = 'P', 'Pending'
        APPROVED = 'A', 'Approved'
        FAILED = 'F', 'Failed'
    
    user = models.ForeignKey(User, 
                            on_delete=models.CASCADE)
    task = models.CharField(max_length=100,
                            null=True,
                            blank=True)
    status = models.CharField(max_length=1, 
                              choices=StatusChoices.choices,
                              default=StatusChoices.PENDING)
    created_at = models.DateTimeField(auto_now_add=True)
    matrix = models.JSONField(null=True,
                              blank=True)
    vector = models.JSONField(null=True,
                              blank=True)
    result = models.JSONField(null=True,
                              blank=True)
    