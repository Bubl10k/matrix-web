from celery.result import AsyncResult
from django.conf import settings
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST

from .paginations import TaskAPIPagination

from .tasks import solve_linear_system

from .serializers import TaskDetailSerializer, TaskSerializer

from .models import Task


class TaskViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
    
    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)
    
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        queryset = self.get_queryset()
        if queryset.count() >= settings.MAX_TASKS_PER_USER:
            return Response({'error': 'Task limit reached'}, status=HTTP_400_BAD_REQUEST)
        
        task = serializer.save(user=request.user)
        
        # async worker
        async_result = solve_linear_system.delay(task.id)
        task.task_id = async_result.id
        task.save()
        
        return Response({'message': 'Task created', 'task_id': task.id})
    
    @action(methods=['get'], detail=True)
    def status(self, request, pk=None):
        task = get_object_or_404(Task, pk=pk)
        result = AsyncResult(task.task_id)
        serializer = self.get_serializer(task)
        data = serializer.data
        data.update({'celery_status': result.status})
        
        return Response(data)
    
    @action(methods=['get'], detail=True)
    def result(self, request, pk=None):
        task = get_object_or_404(Task, pk=pk)
        serializer = TaskDetailSerializer(task)
        
        return Response(serializer.data)
    
    @action(methods=['put'], detail=False, url_path='cancel')
    def cancel(self, request):
        print(request.data)
        task = get_object_or_404(Task,
                                 task_id=request.data.get('task_id'))
        result = AsyncResult(task.task_id)
        result.revoke(terminate=True)
        task.status = 'C'
        task.save()
        serializer = self.get_serializer(task)
                
        return Response(serializer.data)
