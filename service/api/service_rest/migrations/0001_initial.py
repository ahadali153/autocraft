# Generated by Django 4.0.3 on 2023-06-05 22:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AutomobileVO',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vin', models.CharField(max_length=350, unique=True)),
                ('sold', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Technician',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=60)),
                ('last_name', models.CharField(max_length=100)),
                ('employee_id', models.CharField(max_length=25)),
            ],
        ),
        migrations.CreateModel(
            name='Appointment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_time', models.DateTimeField()),
                ('reason', models.CharField(max_length=500)),
                ('status', models.CharField(max_length=100)),
                ('vin', models.CharField(max_length=300)),
                ('customer', models.CharField(max_length=300)),
                ('technician', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='+', to='service_rest.technician')),
            ],
        ),
    ]