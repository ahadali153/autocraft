from common.json import ModelEncoder
from .models import Salesperson, Customer, AutomobileVO, Sale


class SalespeopleEncoder(ModelEncoder):
    model = Salesperson
    properties = ["first_name", "last_name", "employee_id", "id"]


class CustomerDetailEncoder(ModelEncoder):
    model = Customer
    properties = ["first_name", "last_name", "address", "phone_number", "id"]


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin"]


class SaleDetailEncoder(ModelEncoder):
    model = Sale
    properties = ["customer", "automobile", "price", "salesperson", "id"]
    encoders = {"automobile": AutomobileVOEncoder(),
                "salesperson": SalespeopleEncoder(),
                "customer": CustomerDetailEncoder()}
