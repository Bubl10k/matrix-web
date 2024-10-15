from django.contrib import admin

from .models import Task

# Register your models here.
@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ['user', 'task_id', 'status']
    list_filter = ['user', 'status']
    search_fields = ['task_id']
    