from django.conf import settings
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST
from celery.result import AsyncResult

from history.models import History
from .tasks import solve


class TaskViewSet(viewsets.ViewSet):
    queryset = History.objects.all()
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return History.objects.filter(user=self.request.user)
    
    def create(self, request, *args, **kwargs):
        matrix = request.data.get('matrix', [])
        vector = request.data.get('vector', [])

        if History.objects.filter(user=request.user).count() >= settings.MAX_TASKS_PER_USER:
            return Response({'error': 'Task limit reached'}, status=HTTP_400_BAD_REQUEST)

        # Валідація
        if not matrix or not vector or len(matrix) != len(vector):
            return Response({'error': 'Invalid input'}, status=HTTP_400_BAD_REQUEST)
        if len(matrix) != len(matrix[0]):
            return Response({'error': 'Matrix must be square'}, status=HTTP_400_BAD_REQUEST)

        task = History.objects.create(
            user=request.user,
            matrix=matrix,
            vector=vector,
            status='pending'
        )

        task_id = solve.delay(task.id)
        task.task_id = task_id
        task.save()
        
    @action(detail=True, methods=['GET'])
    def status(self, request, pk=None):
        task = get_object_or_404(History, pk=pk, user=request.user)
        result = AsyncResult(task.task_id)

        return Response({
            'id': task.id,
            'status': task.status,
            'result': task.result,
            'celery_status': result.status
        })
        
    @action(detail=True, methods=['POST'])
    def cancel(self, request, pk=None):
        task = get_object_or_404(History, pk=pk, user=request.user)
        result = AsyncResult(task.task_id)
        result.revoke(terminate=True)
        task.status = 'cancelled'
        task.save()

        return Response({'message': 'Task cancelled'})
    
    @action(detail=False, methods=['GET'])
    def history(self, request):
        tasks = History.objects.filter(user=request.user)
        task_list = [
            {
                'id': task.id,
                'matrix': task.matrix,
                'vector': task.vector,
                'status': task.status,
                'result': task.result,
                'created_at': task.created_at,
                'updated_at': task.updated_at
            }
            for task in tasks
        ]
        return Response({'tasks': task_list})
    