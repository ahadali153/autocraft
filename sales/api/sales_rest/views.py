from django.shortcuts import render
from django.http import JsonResponse
from .models import Sale, Salesperson, AutomobileVO, Customer
import json
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
# Create your views here.


class SalespeopleEncoder(ModelEncoder):
    model = Salesperson
    properties = ["first_name", "last_name", "employee_id", "id"]


class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = ["first_name", "last_name", "id"]


class CustomerDetailEncoder(ModelEncoder):
    model = Customer
    properties = ["first_name", "last_name", "address", "phone_number", "id"]


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin"]


class SalesListEncoder(ModelEncoder):
    model = Sale
    properties = ["customer", "automobile", "id"]
    encoders = {"automobile": AutomobileVOEncoder(), "customer": CustomerListEncoder()}


class SaleDetailEncoder(ModelEncoder):
    model = Sale
    properties = ["customer", "automobile", "price", "salesperson", "id"]
    encoders = {"automobile": AutomobileVOEncoder(),
                "salesperson": SalespeopleEncoder(),
                "customer": CustomerDetailEncoder()}


@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse({"sales": sales}, encoder=SalesListEncoder)
    else:
        content = json.loads(request.body)
        try:
            automobile = AutomobileVO.objects.get(vin=content["automobile"])
            content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Automobile, try again!"},
                status=400
            )
        try:
            salesperson = Salesperson.objects.get(id=content["salesperson"])
            content["salesperson"] = salesperson
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Salesperson does not exist"},
                status=404
            )
        try:
            customer = Customer.objects.get(id=content["customer"])
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer does not exist"},
                status=400
            )
        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SaleDetailEncoder,
            safe=False
        )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_sale(request, id):
    if request.method == "GET":
        try:
            sale = Sale.objects.get(id=id)
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "this sale does not exist"},
                status=404
            )
        return JsonResponse(
            sale,
            encoder=SaleDetailEncoder,
            safe=False,
            )
    elif request.method == "DELETE":
        try:
            sale = Sale.objects.get(id=id)
            sale.delete()
            return JsonResponse(
                sale,
                encoder=SaleDetailEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            return JsonResponse({"message": "Sale does not exist"}, status=404)
    else:
        content = json.loads(request.body)
        try:
            try:
                if "automobile" in content:
                    automobile = AutomobileVO.objects.get(vin=content["automobile"])
                    content["automobile"] = automobile
            except AutomobileVO.DoesNotExist:
                return JsonResponse(
                    {"message": "Invalid automobile"}, status=400
                )
            try:
                if "salesperson" in content:
                    salesperson = Salesperson.objects.get(id=content["salesperson"])
                    content["salesperson"] = salesperson
            except Salesperson.DoesNotExist:
                return JsonResponse(
                    {"message": "Salesperson does not exist"},
                    status=404
                )
            try:
                if "customer" in content:
                    customer = Customer.objects.get(id=content["customer"])
                    content["customer"] = customer
            except Customer.DoesNotExist:
                return JsonResponse(
                    {"message": "Customer does not exist"},
                    status=404
                )
            Sale.objects.filter(id=id).update(**content)
            sale = Sale.objects.get(id=id)
            return JsonResponse(
                sale,
                encoder=SaleDetailEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            return JsonResponse({"message": "invalid sale id"}, status=404)


@require_http_methods(["GET", "POST"])
def api_list_salespeople(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse({"salespeople": salespeople}, encoder=SalespeopleEncoder)
    else:
        try:
            content = json.loads(request.body)
            salesperson = Salesperson.objects.create(**content)
            return JsonResponse(
                salesperson,
                encoder=SalespeopleEncoder,
                safe=False
            )
        except:
            return JsonResponse({"message": "Could not create the salesperson"})


@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_salesperson(request, id):

    if request.method == "GET":
        try:
            salesperson = Salesperson.objects.get(id=id)
            return JsonResponse(
                salesperson,
                encoder=SalespeopleEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "this salesperson does not exist"},
                status=404
            )
    elif request.method == "DELETE":
        try:
            salesperson = Salesperson.objects.get(id=id)
            salesperson.delete()
            return JsonResponse(
                salesperson,
                encoder=SalespeopleEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse({"message": "Salesperson does not exist"}, status=404)
    else:
        try:
            content = json.loads(request.body)
            Salesperson.objects.filter(id=id).update(**content)
            salesperson = Salesperson.objects.get(id=id)
            return JsonResponse(
                salesperson, encoder=SalespeopleEncoder, safe=False
            )
        except Salesperson.DoesNotExist:
            return JsonResponse({"Error": "Salesperson does not exist"}, status=404)


@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse({"customers": customers}, encoder=CustomerListEncoder)
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerDetailEncoder,
                safe=False
            )
        except:
            return JsonResponse({"message": "Could not create the customer"}, status=400)

@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_customer(request, id):

    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=id)
            return JsonResponse(
                customer,
                encoder=CustomerDetailEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "this customer does not exist"},
                status=404
            )
    elif request.method == "DELETE":
        try:
            customer = Customer.objects.get(id=id)
            customer.delete()
            return JsonResponse(
                customer,
                encoder=CustomerDetailEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse({"Error": "Customer does not exist"}, status=404)
    else:
        try:
            content = json.loads(request.body)
            Customer.objects.filter(id=id).update(**content)
            salesperson = Customer.objects.get(id=id)
            return JsonResponse(
                salesperson, encoder=CustomerDetailEncoder, safe=False
            )
        except Customer.DoesNotExist:
            return JsonResponse({"Error": "Customer does not exist"}, status=404)
