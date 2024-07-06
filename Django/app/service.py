from django.contrib.auth.hashers import check_password
from .models import *
from .serializers import *
from django.contrib.auth.hashers import make_password
from django.core.files.uploadedfile import UploadedFile

# --------------------------------Login user--------------------------------------------#


# handle login user
# Kiểm tra username có tồn tại hay không
def check_username(username):
    return User.objects.filter(username=username).exists()


# hàm xử lý đăng nhập
def handle_user_login_service(username, password):
    response = {}  # dùng để thông báo thành công or lỗi
    is_exist = check_username(username)  # kiếm tra username

    # Trường hợp có username
    if is_exist:
        try:
            user = User.objects.get(username=username)  # lấy ra username có trong db
            if check_password(
                password, user.password
            ):  # do có usn , tiếp theo check pass xem có khớp với db không
                # trả thông báo thành công và ngược lại
                response["errCode"] = 0
                response["errMessage"] = "Login successful!"
                response["user"] = UserSerializer(user).data
            else:  # ngược lại thì thông báo sai pass
                response["errCode"] = 3
                response["errMessage"] = "Wrong password!"
        except User.DoesNotExist:  # trường hợp không có username trong db
            response["errCode"] = 2
            response["errMessage"] = "User does not exist!"
    else:  # trường hợp không có username
        response["errCode"] = 1
        response["errMessage"] = "Username does not exist. Pls try another Username!"
    return response


# --------------------------------Update user--------------------------------------------#


# handle Update user
# hàm check id user
def check_id_user(user_id):
    return User.objects.filter(id=user_id).exists()


# hàm xử lý cập nhật
def update_user_data_service(data, files):
    response = {}
    user_id = data.get("id")
    # kiểm tra có lấy ra được id của user đó không
    if not user_id:
        response["errCode"] = 1
        response["errMessage"] = "Missing user ID!"
        return response
    # Có id thì sẽ truyền vào hàm kiểm tra lần nữa
    is_exist = check_id_user(user_id)

    if is_exist:
        user = User.objects.get(id=user_id)  # lấy ra id của user có trong db
        user_serializer = {
            key: value
            for key, value in data.items()
            if key not in ["id", "username", "password", "email"]
        }
        # kiểm tra gender có trong dữ liệu không
        if "gender" in data:
            gender_key = data["gender"]
            try:
                gender_instance = Allcode.objects.get(type="GENDER", key=gender_key)
                user.gender = gender_instance
            except Allcode.DoesNotExist:
                response["errCode"] = 4
                response["errMessage"] = (
                    f"Gender with key '{gender_key}' does not exist!"
                )
                return response

        if "role" in data:
            role_key = data["role"]
            try:
                role_instance = Allcode.objects.get(type="ROLE", key=role_key)
                user.role = role_instance
            except Allcode.DoesNotExist:
                response["errCode"] = 5
                response["errMessage"] = f"Role with key '{role_key}' does not exist!"
                return response
        if "avatar" in files:
            avatar_file = files["avatar"]
            user.avatar = avatar_file
        user_data = UserSerializer(user, data=user_serializer, partial=True)
        if user_data.is_valid():
            user_data.save()
            response["errCode"] = 0
            response["errMessage"] = "Update successful!"
            response["user"] = user_data.data
            return response
        else:
            response["errCode"] = 3
            response["errMessage"] = "Update failed!"
            return response
    else:
        response["errCode"] = 2
        response["errMessage"] = "Id does not exist!"
        return response


# -------------------------------Create new user--------------------------------------#


# Kiểm tra email có tồn tại hay không
def check_email(email):
    return User.objects.filter(email=email).exists()


# kiểm tra phone có tồn tại hay không ( mục đích 1 user chỉ sở hữu 1 sdt)
def check_phone(phone):
    return User.objects.filter(phone_number=phone).exists()


# hàm xử lý create new user
def create_new_user_service(data, files):
    response = {}
    username = data.get("username")
    email = data.get("email")
    phone = data.get("phone_number")
    password = data.get("password")

    if check_email(email) or check_username(username) or check_phone(phone):
        response["errCode"] = 1
        response["errMessage"] = (
            "Username || Email || Phone already exists. Pls try another email!"
        )
        return response
    if username == "" or email == "" or password == "":
        response["errCode"] = 2
        response["errMessage"] = "Username || email || password cannot null"
        return response

    hashed_password = make_password(password)  # băm password
    role_key = data.get("role")
    if role_key:
        role_instance = Allcode.objects.get(type="ROLE", key=role_key)
    else:
        response["errCode"] = 4
        response["errMessage"] = "Role does not exist"
        return response
    gender_key = data.get("gender")
    if gender_key:
        gender_instance = Allcode.objects.get(type="GENDER", key=gender_key)
    else:
        response["errCode"] = 5
        response["errMessage"] = "Role does not exist"
        return response

    user = User.objects.create(
        first_name=data.get("first_name"),
        last_name=data.get("last_name"),
        username=username,
        email=email,
        password=hashed_password,
        phone_number=phone,
        role=role_instance,
        gender=gender_instance,
        avatar=files.get("avatar"),
    )

    # kiểm tra user vừa tạo có thành công không
    if user.id:
        response["errCode"] = 0
        response["errMessage"] = "Create new user successful!"
        response["user"] = UserSerializer(user).data
        return response
    else:
        response["errCode"] = 3
        response["errMessage"] = "Create new user failed!"
        return response


# -------------------------------Delete user--------------------------------------#
def delete_user_service(data):
    response = {}
    user_id = data.get("id")
    if not user_id:
        response["errCode"] = 1
        response["errMessage"] = "Missing required parameter!"
        return response
    is_exist = check_id_user(user_id)
    if is_exist:
        user = User.objects.get(id=user_id)
        user.delete()
        response["errCode"] = 0
        response["errMessage"] = "Delete user successful!"
        return response
    else:
        response["errCode"] = 2
        response["errMessage"] = "Id does not exist!"
        return response


# -------------------------------Get All code--------------------------------------#
def get_allcode_service(type_input):
    response = {}
    if not type:  # Nếu không truyền type vào thì thông báo lỗi 1
        response["errCode"] = 1
        response["errMessage"] = "Missing required parameter!"
        return response
    allcodes = Allcode.objects.filter(type=type_input)  # lọc ra type truyền vào
    if not allcodes.exists():  # nếu type truyền vào không tồn tại thì báo lỗi 2
        response["errCode"] = 2
        response["errMessage"] = "Type not found"
        return response

    serialized_data = AllcodeSerializer(
        allcodes, many=True
    ).data  # lấy ra các fields bên serializer
    response["errCode"] = 0
    response["errMessage"] = "Get allcode successful!"
    response["data"] = serialized_data
    return response


# -------------------------------Get all user by role--------------------------------------#
def get_user_by_role(role_key):
    response = {}
    if not role_key:  # Nếu không truyền role_key vào thì thông báo lỗi 1
        response["errCode"] = 1
        response["errMessage"] = "Missing required parameter!"
        return response

    # Lấy từ bảng Allcodes để lấy ra thông tin role dựa trên role_key
    role = Allcode.objects.filter(type="ROLE", key=role_key).first()

    if not role:
        response["errCode"] = 2
        response["errMessage"] = "Role key not found"
        return response

    # lấy user ra từ role_id
    users = User.objects.filter(role_id=role)

    # Không tìm thấy user theo role thì thông báo lỗi 3
    if not users.exists():
        response["errCode"] = 3
        response["errMessage"] = "User not found"
        return response

    # có user
    all_users_data = UserSerializer(users, many=True).data
    response["errCode"] = 0
    response["errMessage"] = "Get user by role success!"
    response["data"] = all_users_data
    return response


# -----------------------------get_all_products_by_category--------------------------
def get_all_products_by_category(category_key):
    response = {}
    category = Allcode.objects.filter(type="CATEGORY", key=category_key).first()

    if not category:
        response["errCode"] = 1
        response["errMessage"] = "Category key not found"
        return response

    products = Product.objects.filter(category_id=category)

    if not products.exists():
        response["errCode"] = 2
        response["errMessage"] = "Product not found"
        return response

    product_serializer = ProductSerializer(products, many=True).data
    response["errCode"] = 0
    response["errMessage"] = "Get all products by category success!"
    response["data"] = product_serializer
    return response


# -----------------------------delete product by id--------------------------
def check_id_product(product_id):
    return Product.objects.filter(id=product_id).exists()


def delete_product_by_id(data):
    response = {}
    product_id = data.get("id")
    if not product_id:
        response["errCode"] = 1
        response["errMessage"] = "Missing required parameter!"
        return response

    is_exist = check_id_product(product_id)
    if is_exist:
        product = Product.objects.get(id=product_id)
        if not product:
            response["errCode"] = 2
            response["errMessage"] = "Product not found"
            return response

        product.delete()
        response["errCode"] = 0
        response["errMessage"] = "Delete product successful!"
        return response
    else:
        response["errCode"] = 2
        response["errMessage"] = "Product ID does not exist!"
        return response


# -----------------------------edit product by id--------------------------


def edit_product_by_id(data, files):
    response = {}
    product_id = data.get("id")

    if not product_id:
        response["errCode"] = 1
        response["errMessage"] = "Missing required parameter!"
        return response
    is_exist = check_id_product(product_id)
    if is_exist:
        product = Product.objects.get(id=product_id)
        if not product:
            response["errCode"] = 2
            response["errMessage"] = "Product not found"
        if "category" in data:
            category_key = data["category"]
            try:
                category_instance = Allcode.objects.get(
                    type="CATEGORY", key=category_key
                )
                product.category = category_instance
            except Allcode.DoesNotExist:
                response["errCode"] = 3
                response["errMessage"] = (
                    f"Category with key '{category_key}' does not exist!"
                )
                return response

        if "brand" in data:
            brand_name = data["brand"]
            try:
                # Query the Allcode model to get the brand instance
                brand_instance = Brand.objects.get(name=brand_name)
                product.brand = brand_instance
            except Allcode.DoesNotExist:
                response["errCode"] = 4
                response["errMessage"] = (
                    f"Brand with name '{brand_name}' does not exist!"
                )
                return response

        if "product_image" in files:
            product_image_file = files["product_image"]
            product.product_image = product_image_file

        product_data = ProductSerializer(product, data=data, partial=True)
        if product_data.is_valid():
            product_data.save()
            response["errCode"] = 0
            response["errMessage"] = "Update success!"
            response["data"] = product_data.data
            return response
        else:
            response["errCode"] = 4
            response["errMessage"] = "Update failed!"
            return response
    else:
        response["errCode"] = 5
        response["errMessage"] = "Id does not exist!"
        return response


# -----------------------------API create product--------------------------
# hàm xử lý create new user
def create_new_product_service(data, files):
    response = {}
    category_key = data.get("category")
    if category_key:
        category_instance = Allcode.objects.get(type="CATEGORY", key=category_key)
    else:
        response["errCode"] = 1
        response["errMessage"] = "Category does not exist"
        return response
    brand_id = data.get("brand")
    if brand_id:
        brand_instance = Brand.objects.get(name=brand_id)
    else:
        response["errCode"] = 2
        response["errMessage"] = "Brand does not exist"
        return response

    product = Product.objects.create(
        title=data.get("title"),
        selling_price=data.get("selling_price"),
        description=data.get("description"),
        discount=data.get("discount"),
        brand=brand_instance,
        category=category_instance,
        quatity_stock=data.get("quatity_stock"),
        product_image=files.get("product_image"),
    )

    # kiểm tra user vừa tạo có thành công không
    if product.id:
        response["errCode"] = 0
        response["errMessage"] = "Create new product successful!"
        response["user"] = ProductSerializer(product).data
        return response
    else:
        response["errCode"] = 3
        response["errMessage"] = "Create new product failed!"
        return response


# -----------------------------API get brand--------------------------
def get_brand_service(data):
    response = {}
    brand = Brand.objects.all()

    if not brand:
        response["errCode"] = 1
        response["errMessage"] = "Brand key not found"
        return response

    brand_data = BrandSerializer(brand, many=True).data
    response["errCode"] = 0
    response["errMessage"] = "Get brand success!"
    response["data"] = brand_data
    return response
