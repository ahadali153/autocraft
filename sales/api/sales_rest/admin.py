from django.contrib import admin
from .models import Sale, Customer, Salesperson


@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    pass


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    pass


@admin.register(Salesperson)
class SalespersonAdmin(admin.ModelAdmin):
    pass
