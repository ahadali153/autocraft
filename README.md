# CarCar

Team:

- Ahad - Which microservice? Sales
- Brian - Which microservice? Service

## Design

## Service microservice

Explain your models and integration with the inventory
microservice, here.

Created Technician, Appointment and AutomobileVO. The Technician Model gives a technicians first and last name along with a employee ID num. The Appointment Model, creates a date and time for appointment. the reason, the status which is set to pending upon completion of the form. A VIN and a customer name. Along with the Technician as a foreign key. The only time I interact with the inventory microservice is to get existing vehicle VINs and to see if the the service appointment created VIN matches an existing automobiles VIN. If it does the appointment is given a VIP status set to yes. if not, it is set to no.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.

Created Sale, Salesperson, Customer, and AutomobileVO model. A poller polled Automobile data from inventory microservice and updated/created these instances in the AutomobileVO object. The Sale model had fields that were foreign key relationships to the Salesperson, Customer, and AutomobileVO models. The Customer model has first_name, last_name, address, and phone_number attributes. The Salesperson had first_name, last_name, employee_id attributes. AutomobileVO is a value object and only contans VIN numbers of each unique automobile instance from the Automobile model in the inventory microservice.
