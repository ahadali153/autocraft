from django.db import models
from django.urls import reverse
from django.core.validators import MinValueValidator, MaxValueValidator
# Create your models here.


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)


class Salesperson(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    employee_id = models.PositiveIntegerField(unique=True, null=True, validators=[MinValueValidator(1000000), MaxValueValidator(9999999)])

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    # def get_api_url(self):
    #     return reverse("api_list_shoes", kwargs={"id": self.id})

    class Meta:
        ordering = ("first_name",)


class Customer(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=15)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    # def get_api_url(self):
    #     return reverse("api_list_shoes", kwargs={"id": self.id})

    class Meta:
        ordering = ("first_name",)


class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="+",
        on_delete=models.CASCADE,
    )
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="sale",
        on_delete=models.CASCADE
    )
    customer = models.ForeignKey(
        Customer,
        related_name="sale",
        on_delete=models.CASCADE
    )
    price = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.customer} - {self.salesperson}"

    # def get_api_url(self):
    #     return reverse("api_list_shoes", kwargs={"id": self.id})

    class Meta:
        ordering = ("customer",)
