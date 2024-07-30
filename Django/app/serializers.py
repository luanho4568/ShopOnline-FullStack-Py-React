from rest_framework.serializers import ModelSerializer, SerializerMethodField, CharField
from .models import *


class UserSerializer(ModelSerializer):
    role = SerializerMethodField()
    gender = SerializerMethodField()

    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {
            "password": {"write_only": "true"},
        }

    def get_role(self, obj):
        role_key = obj.role
        role = Allcode.objects.filter(type="ROLE", key=role_key).first()
        return role.key if role else None

    def get_gender(self, obj):
        gender_key = obj.gender
        gender = Allcode.objects.filter(type="GENDER", key=gender_key).first()
        return gender.key if gender else None

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data["password"])
        user.save()
        return user


class AllcodeSerializer(ModelSerializer):
    class Meta:
        model = Allcode
        fields = "__all__"


class ProductSerializer(ModelSerializer):
    brand = SerializerMethodField()
    category = SerializerMethodField()

    def get_category(self, obj):
        category_key = obj.category
        category = Allcode.objects.filter(type="CATEGORY", key=category_key).first()
        return category.key if category else None

    def get_brand(self, obj):
        return obj.brand.name if obj.brand else None

    class Meta:
        model = Product
        fields = "__all__"


class OrderSerializer(ModelSerializer):
    status = SerializerMethodField()
    user = UserSerializer()

    def get_status(self, obj):
        status_key = obj.status
        status = Allcode.objects.filter(type="STATUS", key=status_key).first()
        return status.key if status else None

    class Meta:
        model = Order
        fields = "__all__"


class OrderItemSerializer(ModelSerializer):
    product = ProductSerializer()
    order = OrderSerializer()

    class Meta:
        model = OrderItem
        fields = "__all__"


class BrandSerializer(ModelSerializer):
    class Meta:
        model = Brand
        fields = "__all__"


class AddressSerializer(ModelSerializer):
    user = UserSerializer()
    province = SerializerMethodField()

    def get_province(self, obj):
        return obj.get_province_display()

    class Meta:
        model = Address
        fields = "__all__"


class ShippingAddressSerializer(ModelSerializer):
    address = AddressSerializer()

    class Meta:
        model = ShippingAddress
        fields = "__all__"
