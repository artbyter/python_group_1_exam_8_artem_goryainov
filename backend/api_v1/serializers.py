from webapp.models import Task, TASK_STATUS
from rest_framework import serializers


class TaskDisplaySerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:task-detail')
    status = serializers.ChoiceField(choices=TASK_STATUS, source='get_status_display')

    class Meta:
        model = Task
        fields = ('url', 'id', 'summary', 'description', 'due_date', 'status', 'time_planned')



class TaskCreateSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:task-detail')
    status = serializers.ChoiceField(choices=TASK_STATUS)

    class Meta:
        model = Task
        fields = ('url', 'id', 'summary', 'description', 'due_date', 'status', 'time_planned')

