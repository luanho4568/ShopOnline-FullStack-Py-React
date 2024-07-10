from django.db import models
from django.contrib.auth.models import AbstractUser

# Province
PROVINCE_CHOICES = (
    ("AnGiang", "An Giang"),
    ("BaRiaVungTau", "Bà Rịa - Vũng Tàu"),
    ("BacLieu", "Bạc Liêu"),
    ("BacGiang", "Bắc Giang"),
    ("BacKan", "Bắc Kạn"),
    ("BacNinh", "Bắc Ninh"),
    ("BenTre", "Bến Tre"),
    ("BinhDinh", "Bình Định"),
    ("BinhDuong", "Bình Dương"),
    ("BinhPhuoc", "Bình Phước"),
    ("BinhThuan", "Bình Thuận"),
    ("CaMau", "Cà Mau"),
    ("CaoBang", "Cao Bằng"),
    ("CanTho", "Cần Thơ"),
    ("DaNang", "Đà Nẵng"),
    ("DakLak", "Đắk Lắk"),
    ("DakNong", "Đắk Nông"),
    ("DienBien", "Điện Biên"),
    ("DongNai", "Đồng Nai"),
    ("DongThap", "Đồng Tháp"),
    ("GiaLai", "Gia Lai"),
    ("HaGiang", "Hà Giang"),
    ("HaNam", "Hà Nam"),
    ("HaNoi", "Hà Nội"),
    ("HaTinh", "Hà Tĩnh"),
    ("HaiDuong", "Hải Dương"),
    ("HaiPhong", "Hải Phòng"),
    ("HauGiang", "Hậu Giang"),
    ("HoaBinh", "Hòa Bình"),
    ("HungYen", "Hưng Yên"),
    ("KhanhHoa", "Khánh Hòa"),
    ("KienGiang", "Kiên Giang"),
    ("KonTum", "Kon Tum"),
    ("LaiChau", "Lai Châu"),
    ("LamDong", "Lâm Đồng"),
    ("LangSon", "Lạng Sơn"),
    ("LaoCai", "Lào Cai"),
    ("LongAn", "Long An"),
    ("NamDinh", "Nam Định"),
    ("NgheAn", "Nghệ An"),
    ("NinhBinh", "Ninh Bình"),
    ("NinhThuan", "Ninh Thuận"),
    ("PhuTho", "Phú Thọ"),
    ("PhuYen", "Phú Yên"),
    ("QuangBinh", "Quảng Bình"),
    ("QuangNam", "Quảng Nam"),
    ("QuangNgai", "Quảng Ngãi"),
    ("QuangNinh", "Quảng Ninh"),
    ("QuangTri", "Quảng Trị"),
    ("SocTrang", "Sóc Trăng"),
    ("SonLa", "Sơn La"),
    ("TayNinh", "Tây Ninh"),
    ("ThaiBinh", "Thái Bình"),
    ("ThaiNguyen", "Thái Nguyên"),
    ("ThanhHoa", "Thanh Hóa"),
    ("ThuaThienHue", "Thừa Thiên Huế"),
    ("TienGiang", "Tiền Giang"),
    ("TPHCM", "TP Hồ Chí Minh"),
    ("TraVinh", "Trà Vinh"),
    ("TuyenQuang", "Tuyên Quang"),
    ("VinhLong", "Vĩnh Long"),
    ("VinhPhuc", "Vĩnh Phúc"),
    ("YenBai", "Yên Bái"),
)

# Discount
DISCOUNT_CHOICES = (
    (0, 0),
    (10, 10),
    (20, 20),
    (30, 30),
    (40, 40),
    (50, 50),
    (60, 60),
    (70, 70),
    (80, 80),
    (90, 90),
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
    ("Google", "Google"),
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
    address = models.CharField(max_length=200, null=False)
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
