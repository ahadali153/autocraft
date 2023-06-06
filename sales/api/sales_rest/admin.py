from django.contrib import admin
from .models import Sale, Customer, Salesperson
# Register your models here.


@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    pass


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    pass


@admin.register(Salesperson)
class SalespersonAdmin(admin.ModelAdmin):
    pass
