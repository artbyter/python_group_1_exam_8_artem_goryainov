from django.db import models

# Create your models here.

TASK_STATUS = (
    ('queued', "Queued"),
    ('in work', 'In work'),
    ('done', 'Done'),
)


class Task(models.Model):
    summary = models.CharField(max_length=100)
    description = models.TextField(max_length=2000, null=True, blank=True)
    due_date = models.DateTimeField()
    status = models.CharField(max_length=10, choices=TASK_STATUS, default='queued')
    time_planned = models.DecimalField(max_digits=10, decimal_places=1, null=True, blank=True)

    def __str__(self):
        return self.summary[:25]
