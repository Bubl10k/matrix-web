from rest_framework import serializers

from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    status_display = serializers.SerializerMethodField()
    
    class Meta:
        model = Task
        fields = ['id', 'status_display', 'matrix', 'vector',
                  'result', 'task_id', 'created_at', 'updated_at',]
        extra_kwargs = {
            'matrix': {'write_only': True},
            'vector': {'write_only': True},
            'result': {'write_only': True},
        }
        
    def get_status_display(self, obj):
        return obj.get_status_display()
    
    def validate(self, attrs):
        matrix = attrs.get('matrix')
        vector = attrs.get('vector')
        if not matrix or not vector or len(matrix) != len(vector):
            raise serializers.ValidationError({'error': 'Invalid input'})
        if len(matrix) != len(matrix[0]):
            raise serializers.ValidationError({'error': 'Matrix must be square'})
        return attrs


class TaskDetailSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Task
        fields = '__all__'
        