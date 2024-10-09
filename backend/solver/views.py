import numpy as np
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST


@api_view(['POST'])
def solve(request):
    matrix = np.array(request.data.get('matrix', []))
    vector = np.array(request.data.get('vector', []))
    
    if matrix.size == 0 or vector.size == 0 or matrix.shape[0] != vector.shape[0]:
        return Response({'error': 'Invalid input'}, status=HTTP_400_BAD_REQUEST)
    
    print(matrix)
    
    if matrix.shape[0] != matrix.shape[1]:
        return Response({'error': 'Matrix must be square'}, status=HTTP_400_BAD_REQUEST)
    
    result = np.linalg.solve(matrix, vector)
    return Response({'result': result.tolist()})
    