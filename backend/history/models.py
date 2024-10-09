from django.contrib.auth.models import User
from django.db import models

# Create your models here.
class History(models.Model):
    class StatusChoices(models.TextChoices):
        PENDING = 'P', 'Pending'
        APPROVED = 'A', 'Approved'
    
    user = models.ForeignKey(User, 
                            on_delete=models.CASCADE)
    task = models.CharField(max_length=100)
    status = models.CharField(max_length=1, 
                              choices=StatusChoices.choices,
                              default=StatusChoices.PENDING)
    created_at = models.DateTimeField(auto_now_add=True)
    result = models.JSONField(null=True, blank=True)
    