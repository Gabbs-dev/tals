# Generated by Django 5.0.6 on 2024-06-25 03:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuario',
            name='id',
            field=models.AutoField(max_length=11, primary_key=True, serialize=False),
        ),
    ]
