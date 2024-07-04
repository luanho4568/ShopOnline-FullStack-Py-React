from django.contrib import admin
from django.contrib.auth.models import Permission
from .models import *
from django.utils.html import mark_safe


class AddressInline(admin.TabularInline):
    model = Address
    pk_name = "user"


class UserAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "username",
        "email",
        "phone_number",
        "is_active",
        "role",
        "gender",
    ]
    search_fields = ["username", "email"]
    list_filter = ["username", "email"]
    readonly_fields = ["image"]
    inlines = (AddressInline,)

    def image(self, user):
        return mark_safe(
            '<img src="/static/{img_url}" alt="{alt}" width="100" height="100" />'.format(
                img_url=user.avatar.name, alt=user.username
            )
        )


class AddressAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "locality", "city", "province"]
    search_fields = ["user"]


class ProductAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "title",
        "selling_price",
        "discount",
        "brand",
        "category",
        "created_date",
        "updated_date",
        "deleted",
    ]
    search_fields = ["title", "selling_price", "brand", "category"]
    readonly_fields = ["image"]

    def image(self, product):
        return mark_safe(
            '<img src="/static/{img_url}" alt="{alt}" width="100" height="100" />'.format(
                img_url=product.product_image.name, alt=product.title
            )
        )


class OrderAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "date_oder", "status", "transaction_id"]
    search_fields = ["user"]


class OrderItemAdmin(admin.ModelAdmin):
    list_display = ["id", "order", "product", "quantity", "date_added"]


class ShippingAddressAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "order", "address", "date_added"]
    search_fields = ["user"]


class AllcodesAdmin(admin.ModelAdmin):
    list_display = ["id","type","key","valueEn","valueVi"]


class BrandAdmin(admin.ModelAdmin):
    list_display = ["id","name"]


# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(Address, AddressAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem, OrderItemAdmin)
admin.site.register(ShippingAddress, ShippingAddressAdmin)
admin.site.register(Allcode, AllcodesAdmin)
admin.site.register(Brand, BrandAdmin)
admin.site.register(Permission)
