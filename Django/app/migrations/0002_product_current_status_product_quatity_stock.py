# Generated by Django 5.0.6 on 2024-07-02 01:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='current_status',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='product',
            name='quatity_stock',
            field=models.IntegerField(default=100),
        ),
    ]
