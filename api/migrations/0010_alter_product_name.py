# Generated by Django 4.0.5 on 2022-07-09 18:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_alter_product_seller'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='name',
            field=models.CharField(max_length=25),
        ),
    ]
