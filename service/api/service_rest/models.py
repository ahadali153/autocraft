from django.db import models


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=350, unique=True)
    sold = models.CharField(max_length=20)

    def __str__(self):
        return self.vin


class Technician(models.Model):
    first_name = models.CharField(max_length=60)
    last_name = models.CharField(max_length=100)

    employee_id = models.CharField(max_length=25)

    def __str__(self):
        return self.employee_id


class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=500)
    status = models.CharField(max_length=100)
    vin = models.CharField(max_length=300)
    customer = models.CharField(max_length=300)

    technician = models.ForeignKey(
        Technician,
        related_name="+",
        on_delete=models.CASCADE,
        null=True,
    )

    def __str__(self):
        return self.vin
