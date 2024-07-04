from django.db import models
from django.contrib.auth.models import AbstractUser

# Province
PROVINCE_CHOICES = (
    ("An Giang", "An Giang"),
    ("Bà Rịa - Vũng Tàu", "Bà Rịa - Vũng Tàu"),
    ("Bạc Liêu", "Bạc Liêu"),
    ("Bắc Giang", "Bắc Giang"),
    ("Bắc Kạn", "Bắc Kạn"),
    ("Bắc Ninh", "Bắc Ninh"),
    ("Bến Tre", "Bến Tre"),
    ("Bình Định", "Bình Định"),
    ("Bình Dương", "Bình Dương"),
    ("Bình Phước", "Bình Phước"),
    ("Bình Thuận", "Bình Thuận"),
    ("Cà Mau", "Cà Mau"),
    ("Cao Bằng", "Cao Bằng"),
    ("Cần Thơ", "Cần Thơ"),
    ("Đà Nẵng", "Đà Nẵng"),
    ("Đắk Lắk", "Đắk Lắk"),
    ("Đắk Nông", "Đắk Nông"),
    ("Điện Biên", "Điện Biên"),
    ("Đồng Nai", "Đồng Nai"),
    ("Đồng Tháp", "Đồng Tháp"),
    ("Gia Lai", "Gia Lai"),
    ("Hà Giang", "Hà Giang"),
    ("Hà Nam", "Hà Nam"),
    ("Hà Nội", "Hà Nội"),
    ("Hà Tĩnh", "Hà Tĩnh"),
    ("Hải Dương", "Hải Dương"),
    ("Hải Phòng", "Hải Phòng"),
    ("Hậu Giang", "Hậu Giang"),
    ("Hòa Bình", "Hòa Bình"),
    ("Hưng Yên", "Hưng Yên"),
    ("Khánh Hòa", "Khánh Hòa"),
    ("Kiên Giang", "Kiên Giang"),
    ("Kon Tum", "Kon Tum"),
    ("Lai Châu", "Lai Châu"),
    ("Lâm Đồng", "Lâm Đồng"),
    ("Lạng Sơn", "Lạng Sơn"),
    ("Lào Cai", "Lào Cai"),
    ("Long An", "Long An"),
    ("Nam Định", "Nam Định"),
    ("Nghệ An", "Nghệ An"),
    ("Ninh Bình", "Ninh Bình"),
    ("Ninh Thuận", "Ninh Thuận"),
    ("Phú Thọ", "Phú Thọ"),
    ("Phú Yên", "Phú Yên"),
    ("Quảng Bình", "Quảng Bình"),
    ("Quảng Nam", "Quảng Nam"),
    ("Quảng Ngãi", "Quảng Ngãi"),
    ("Quảng Ninh", "Quảng Ninh"),
    ("Quảng Trị", "Quảng Trị"),
    ("Sóc Trăng", "Sóc Trăng"),
    ("Sơn La", "Sơn La"),
    ("Tây Ninh", "Tây Ninh"),
    ("Thái Bình", "Thái Bình"),
    ("Thái Nguyên", "Thái Nguyên"),
    ("Thanh Hóa", "Thanh Hóa"),
    ("Thừa Thiên Huế", "Thừa Thiên Huế"),
    ("Tiền Giang", "Tiền Giang"),
    ("TP Hồ Chí Minh", "TP Hồ Chí Minh"),
    ("Trà Vinh", "Trà Vinh"),
    ("Tuyên Quang", "Tuyên Quang"),
    ("Vĩnh Long", "Vĩnh Long"),
    ("Vĩnh Phúc", "Vĩnh Phúc"),
    ("Yên Bái", "Yên Bái"),
)

# Discount
DISCOUNT_CHOICES = (
    (0, 0),
    (10, 10),
    (20, 20),
    (3, 30),
    (4, 40),
    (5, 50),
    (6, 60),
    (7, 70),
    (8, 80),
    (9, 90),
    (100, 100),
)

# CATEGORY_CHOICES = (
#     ("Phone", "Phone"),
#     ("Laptop", "Laptop"),
#     ("Tablet", "Tablet"),
#     ("Smartwatch", "Smartwatch"),
#     ("Bluetooth", "Bluetooth"),
#     ("Keyboard", "Keyboard"),
#     ("Mouse", "Mouse"),
#     ("Screen", "Screen"),
# )

BRAND_CHOICES = (
    ("Apple", "Apple"),
    ("Vivo", "Vivo"),
    ("Xiaomi", "Xiaomi"),
    ("Oppo", "Oppo"),
    ("Huawei", "Huawei"),
    ("realme", "realme"),
    ("Lenovo", "Lenovo"),
    ("Motorala", "Motorala"),
    ("Techno", "Techno"),
    ("Sony", "Sony"),
    ("Asus", "Asus"),
    ("Acer", "Acer"),
    ("Dell", "Dell"),
    ("HP", "HP"),
    ("Samsung", "Samsung"),
    ("LG", "LG"),
    ("Nokia", "Nokia"),
)

# USER_ROLE_CHOICES = (
#     ("Admin", "Admin"),
#     ("Staff", "Staff"),
#     ("Customer", "Customer"),
# )


# Create your models here.


class Allcode(models.Model):
    type = models.CharField(max_length=50)
    key = models.CharField(max_length=5)
    valueEn = models.CharField(max_length=50)
    valueVi = models.CharField(max_length=50)

    def __str__(self):
        return self.key


class User(AbstractUser):
    phone_number = models.CharField(max_length=11, blank=True, null=True)
    role = models.ForeignKey(
        Allcode,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="role_id",
    )
    gender = models.ForeignKey(
        Allcode,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="gender_id",
    )
    avatar = models.ImageField(upload_to="uploads/%Y/%m", null=True, blank=True)

    def __str__(self):
        return self.username


class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    locality = models.CharField(max_length=200, null=False)
    city = models.CharField(max_length=50, null=False)
    province = models.CharField(max_length=100, null=False, choices=PROVINCE_CHOICES)


class Brand(models.Model):
    name = models.CharField(max_length=50, choices=BRAND_CHOICES, null=False)

    def __str__(self):
        return self.name


class Product(models.Model):

    class Meta:
        ordering = ["-created_date"]

    title = models.CharField(max_length=100)
    selling_price = models.FloatField()
    description = models.TextField(null=True, blank=True)
    discount = models.IntegerField(choices=DISCOUNT_CHOICES, default=0)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, null=True, blank=True)
    category = models.ForeignKey(
        Allcode,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="category_id",
    )
    quatity_stock = models.IntegerField(default=100)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    current_status = models.BooleanField(default=True)
    deleted = models.BooleanField(default=False)
    product_image = models.ImageField(upload_to="products/%Y/%m", null=True, blank=True)

    def __str__(self):
        return self.title


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    date_oder = models.DateTimeField(auto_now_add=True)
    status = models.ForeignKey(
        Allcode,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="status_id",
    )
    transaction_id = models.CharField(max_length=200, null=True)

    def __str__(self):
        return str(self.id)


class OrderItem(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.SET_NULL, null=True, blank=True
    )
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True, blank=True)
    quantity = models.IntegerField(default=0, null=True, blank=True)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id)


class ShippingAddress(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True, blank=True)
    address = models.ForeignKey(
        Address, on_delete=models.SET_NULL, null=True, blank=True
    )
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.address
