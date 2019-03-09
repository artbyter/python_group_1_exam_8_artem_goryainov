from django.views.decorators.csrf import csrf_exempt
from webapp.models import Task
from rest_framework import viewsets
from api_v1.serializers import TaskDisplaySerializer, TaskCreateSerializer


class NoAuthModelViewSet(viewsets.ModelViewSet):
    authentication_classes = []


class TaskViewSet(NoAuthModelViewSet):
    queryset = Task.objects.all().order_by('status').order_by('-due_date')

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return TaskDisplaySerializer
        else:
            return TaskCreateSerializer

