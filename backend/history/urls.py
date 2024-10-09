from django.urls import include, path
from rest_framework import routers

from . import views


app_name = 'history'

router = routers.DefaultRouter()
router.register('history', views.HistoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
