from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAuthenticated

from .models import History

from .serializers import HistroySerializer

# Create your views here.
class HistoryViewSet(viewsets.GenericViewSet,
                     mixins.ListModelMixin,
                     mixins.CreateModelMixin,):
    serializer_class = HistroySerializer
    permission_classes = [IsAuthenticated]
    queryset = History.objects.all()
    
    def get_queryset(self):
        return History.objects.filter(user=self.request.user)
    