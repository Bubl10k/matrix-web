import time
from django.shortcuts import get_object_or_404
from celery import shared_task
import numpy as np

from .models import Task


@shared_task
def solve_linear_system(task_id):
    try:
        task = get_object_or_404(Task, pk=task_id)
        task.status = 'P'
        task.save()
        
        time.sleep(5)
        
        matrix = np.array(task.matrix)
        vector = np.array(task.vector)
        
        result = np.linalg.solve(matrix, vector)
        task.result = result.tolist()
        task.status = 'A'
        task.save()
        return task.id
    except np.linalg.LinAlgError as e:
        task.status = 'F'
        task.save()
        raise e
    