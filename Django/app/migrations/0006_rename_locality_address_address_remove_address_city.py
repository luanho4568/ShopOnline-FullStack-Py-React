# Generated by Django 5.0.6 on 2024-07-09 17:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_alter_brand_name'),
    ]

    operations = [
        migrations.RenameField(
            model_name='address',
            old_name='locality',
            new_name='address',
        ),
        migrations.RemoveField(
            model_name='address',
            name='city',
        ),
    ]
