from rest_framework.routers import DefaultRouter
from . import views


default_router = DefaultRouter()
default_router.register('tasks', views.TaskViewSet)

urlpatterns = default_router.urls
