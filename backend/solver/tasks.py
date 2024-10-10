from django.shortcuts import get_object_or_404
from history.models import History
from celery import shared_task
import numpy as np

@shared_task
def solve(task_id):
    try:
        task = get_object_or_404(History, pk=task_id)
        task.status = 'P'
        task.save()
        
        matrix = np.array(task.matrix)
        vector = np.array(task.vector)
        
        result = np.linalg.solve(matrix, vector)
        task.result = result.tolist()
        task.status = 'A'
        task.save()
        return result.tolist()
    except np.linalg.LinAlgError as e:
        task.status = 'F'
        task.save()
        raise e
    