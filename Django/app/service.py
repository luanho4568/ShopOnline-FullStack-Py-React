from django.contrib.auth.hashers import check_password
from .models import *
from .serializers import *
from django.contrib.auth.hashers import make_password
from django.db.models import Q

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
            response["data"] = user_data.data
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


# -----------------------------API get detail product--------------------------
def get_product_details_service(product_id):
    response = {}
    if product_id == "ALL":
        product = Product.objects.filter(current_status=True)
        product_data = ProductSerializer(product, many=True).data
        response["errCode"] = 0
        response["errMessage"] = "Get all products is success."
        response["data"] = product_data
        return response
    is_exist = check_id_product(product_id)
    if not is_exist:
        response["errCode"] = 1
        response["errMessage"] = "Product is not exist."
        return response

    product = Product.objects.get(id=product_id)
    product_data = ProductSerializer(product)
    if not product_data:
        response["errCode"] = 2
        response["errMessage"] = "Product is not found."
        return response
    response["errCode"] = 0
    response["errMessage"] = "Get product is success."
    response["data"] = product_data.data
    return response


# -----------------------------API get detail user--------------------------
def get_user_details_service(user_id):
    response = {}
    is_exist = check_id_user(user_id)
    if not is_exist:
        response["errCode"] = 1
        response["errMessage"] = "User is not exist."
        return response

    user = User.objects.get(id=user_id)
    user_data = UserSerializer(user)
    if not user_data:
        response["errCode"] = 2
        response["errMessage"] = "User is not found."
        return response
    response["errCode"] = 0
    response["errMessage"] = "Get User is success."
    response["data"] = user_data.data
    return response


# -----------------------------API delete address user--------------------------
def delete_address_user_service(data):
    response = {}
    address_id = data.get("id")
    if not address_id:
        response["errCode"] = 1
        response["errMessage"] = "Missing required parameter!"
        return response
    is_exist = check_id_address(address_id)
    if is_exist:
        address = Address.objects.get(id=address_id)
        address.delete()
        response["errCode"] = 0
        response["errMessage"] = "Delete address successful!"
        return response
    else:
        response["errCode"] = 2
        response["errMessage"] = "Id does not exist!"
        return response


# -----------------------------API get address user--------------------------
def get_address_user_service(user_id):
    response = {}

    user = User.objects.get(id=user_id)
    if not user:
        response["errCode"] = 1
        response["errMessage"] = "User is not exist."
        return response

    addresses = Address.objects.filter(user=user)
    if not addresses.exists():
        response["errCode"] = 3
        response["errMessage"] = "Address is not found."

    address_data = AddressSerializer(addresses, many=True).data
    if not address_data:
        response["errCode"] = 2
        response["errMessage"] = "Address is not found."
        return response
    response["errCode"] = 0
    response["errMessage"] = "Get address is success."
    response["data"] = address_data
    return response


# -----------------------------API edit address user--------------------------
def update_address_data_service(data):
    response = {}
    user_id = data.get("user")
    address_id = data.get("id")
    user = User.objects.get(id=user_id)
    if not user:
        response["errCode"] = 1
        response["errMessage"] = "User does not exist."
        return response
    address = Address.objects.get(id=address_id, user=user)
    if not address:
        response["errCode"] = 2
        response["errMessage"] = "Address not found."
        return response

    address_data = AddressSerializer(address, data=data, partial=True)
    if address_data.is_valid():
        address_data.save()
        response["errCode"] = 0
        response["errMessage"] = "Update address successful."
        response["data"] = address_data.data
        return response
    else:
        response["errCode"] = 3
        response["errMessage"] = "Update address failed."
        return response


# -----------------------------API edit password--------------------------
# hàm xử lý cập nhật
def update_password_user_service(data):
    response = {}
    user_id = data.get("id")
    old_password = data.get("old_password")
    new_password = data.get("new_password")
    confirm_password = data.get("confirm_password")

    if not user_id:
        response["errCode"] = 1
        response["errMessage"] = "Missing user ID!"
        return response
    if not new_password or not confirm_password or not old_password:
        response["errCode"] = 2
        response["errMessage"] = "These fields cannot null"
        return response

    if new_password != confirm_password:
        response["errCode"] = 3
        response["errMessage"] = "New password and confirm password do not match!"
        return response

    is_exist = check_id_user(user_id)
    if is_exist:
        user = User.objects.get(id=user_id)
        if not check_password(old_password, user.password):
            response["errCode"] = 5
            response["errMessage"] = "Old password is incorrect!"
            return response
        hashed_password = make_password(new_password)
        user.password = hashed_password
        user.save()
        response["errCode"] = 0
        response["errMessage"] = "Update password successful!"
        return response
    else:
        response["errCode"] = 4
        response["errMessage"] = "User ID does not exist!"
        return response


# -----------------------------API get order--------------------------
def get_order_item_list_service(user_id):
    response = {}
    user = User.objects.get(id=user_id)
    if not user:
        response["errCode"] = 1
        response["errMessage"] = "User is not exist."
        return response

    status_s1 = Allcode.objects.get(type="STATUS", key="S1")
    status_s2 = Allcode.objects.get(type="STATUS", key="S2")
    order = (
        Order.objects.filter(user=user)
        .filter(Q(status=status_s1) | Q(status=status_s2))
        .first()
    )
    if not order:
        default_status_key = "S1"
        default_status = Allcode.objects.get(type="STATUS", key=default_status_key)
        if not default_status:
            response["errCode"] = 2
            response["errMessage"] = f"'{default_status_key}' does not exist."
            return response
        order = Order.objects.create(user=user, status=default_status)
    order_items = OrderItem.objects.filter(order=order)
    order_items_data = OrderItemSerializer(order_items, many=True).data
    if not order_items_data:
        response["errCode"] = 4
        response["errMessage"] = "Not item."
        response["data"] = order_items_data
        return response
    for item in order_items_data:
        selling_price = item["selling_price"]
        quantity = item["quantity"]
        total_price = selling_price * quantity
        item["total_price"] = total_price
    response["errCode"] = 0
    response["data"] = order_items_data
    return response


# -----------------------------API add order item--------------------------
def add_order_item__service(data):
    response = {}
    user_id = data.get("user")
    product_id = data.get("product")
    quantity = int(data.get("quantity"))
    user = User.objects.get(id=user_id)
    if not user:
        response["errCode"] = 1
        response["errMessage"] = "User is not exist."
        return response
    status_s1 = Allcode.objects.get(type="STATUS", key="S1")
    status_s2 = Allcode.objects.get(type="STATUS", key="S2")
    order = (
        Order.objects.filter(user=user)
        .filter(Q(status=status_s1) | Q(status=status_s2))
        .first()
    )
    if not order:
        response["errCode"] = 2
        response["errMessage"] = "Order not found."
    new_status_key = "S2"
    new_status = Allcode.objects.get(type="STATUS", key=new_status_key)
    order.status = new_status
    order.save()
    product = Product.objects.get(id=product_id)
    if not product:
        response["errCode"] = 3
        response["errMessage"] = "Product does not exist."
        return response
    # kiểm tra nếu số lượng kho trong product < số lượng thêm sản phẩm thì thông báo hết hàng
    if product.quatity_stock < quantity:
        response["errCode"] = 4
        response["errMessage"] = "The product is out of stock."
        return response

    # xử lý tính toán giá tiền : lấy ra giá tiền có giảm giá từ 0 -100%
    selling_price = product.selling_price * ((100 - product.discount) / 100)

    # lấy or tạo ra order_item dựa trên order và product  được xử lý ở trên
    # nếu chưa có order_item thì tạo ra với mặc định giá trị trên + 2 trường mặc định
    order_item, created = OrderItem.objects.get_or_create(
        order=order,
        product=product,
        defaults={
            "quantity": quantity,
            "selling_price": selling_price,
        },
    )
    # không tạo tức là đã có
    if not created:
        # cập nhật số lượng và giá bán rồi lưu lại
        order_item.quantity += quantity
        order_item.selling_price = selling_price
        order_item.save()
    # xử lý thêm khi thêm thì sẽ trừ theo số lượng thêm vào kho và lưu lại
    product.quatity_stock -= quantity
    product.save()
    # gọi data orderItem từ serializer
    orderItem_data = OrderItemSerializer(order_item)
    if not orderItem_data:
        response["errCode"] = 5
        response["errMessage"] = "Order item does not exist."
        return response
    response["errCode"] = 0
    response["errMessage"] = "Adding product success."
    response["data"] = orderItem_data.data
    return response


# -----------------------------API remove order item--------------------------
def remove_order_item__service(data):
    response = {}
    user_id = data.get("user")
    product_id = data.get("product")
    quantity = int(data.get("quantity"))
    user = User.objects.get(id=user_id)
    if not user:
        response["errCode"] = 1
        response["errMessage"] = "User is not exist."
        return response
    status_S2 = Allcode.objects.get(type="STATUS", key="S2")
    # tìm ra đơn hàng của chính user đăng đăng nhập
    order = Order.objects.filter(user=user, status=status_S2).first()
    if not order:
        response["errCode"] = 2
        response["errMessage"] = "Order does not exist for this user."
        return response
    product = Product.objects.get(id=product_id)
    if not product:
        response["errCode"] = 3
        response["errMessage"] = "Product does not exist."
        return response

    order_item = OrderItem.objects.filter(order=order, product=product).first()
    if not order_item:
        response["errCode"] = 4
        response["errMessage"] = "Product does not exist in the cart."
        return response
    # nếu số lượng trong giỏ hàng > số lượng truyền vào thì sẽ trừ đi số lượng đó và lưu lại
    if order_item.quantity > quantity:
        order_item.quantity -= quantity
        order_item.save()
    elif (
        order_item.quantity == quantity
    ):  # nếu số lượng trong giỏ hàng = với số lượng truyền vào thì gỡ product đó ra khỏi giỏ hàng
        order_item.delete()

    # sau khi gỡ xong thì tăng số lượng bỏ vào kho lại cho product
    product.quatity_stock += quantity
    product.save()
    # Kiểm tra nếu đơn hàng không còn item nào thì trả từ S2 thành S1
    if not OrderItem.objects.filter(order=order).exists():
        new_status = Allcode.objects.get(type="STATUS", key="S1")
        order.status = new_status
        order.save()
    orderItem_data = OrderItemSerializer(order_item)
    if not orderItem_data:
        response["errCode"] = 5
        response["errMessage"] = "Order item does not exist."
        return response
    response["errCode"] = 0
    response["errMessage"] = "Remove product to cart success."
    response["data"] = orderItem_data.data
    return response


# -----------------------------API create address user--------------------------
def check_id_address(address_id):
    return Address.objects.filter(id=address_id).exists()


def create_address_data_service(data):
    response = {}
    user_id = data.get("user")
    address_id = data.get("id")
    isAdress = check_id_address(address_id)
    if isAdress:
        response["errCode"] = 1
        response["errMessage"] = "Address is already exist."
        return response
    user = User.objects.get(id=user_id)
    if not user:
        response["errCode"] = 2
        response["errMessage"] = "User does not exist."
        return response
    address = Address.objects.create(
        user=user,
        address=data.get("address"),
        province=data.get("province"),
    )
    address_data = AddressSerializer(address)
    if not address:
        response["errCode"] = 3
        response["errMessage"] = "Create address fail."
        return response
    response["errCode"] = 0
    response["errMessage"] = "Create address success."
    response["data"] = address_data.data
    return response


# -----------------------------API create orders --------------------------
def create_order_service(data):
    response = {}
    order_id = data.get("order")
    address_id = data.get("address")

    if not order_id or not address_id:
        response["errCode"] = 1
        response["errMessage"] = "Missing required parameter!"
        return response

    order = Order.objects.get(id=order_id)
    if not order:
        response["errCode"] = 2
        response["errMessage"] = "Order not found."
        return response

    address = Address.objects.get(id=address_id)
    if not address:
        response["errCode"] = 3
        response["errMessage"] = "Address not found."
        return response

    # Cập nhật trạng thái đơn hàng
    new_status = Allcode.objects.get(type="STATUS", key="S3")
    order.status = new_status
    order.save()

    shipping_address = ShippingAddress.objects.filter(
        user=order.user, order=order
    ).first()
    if shipping_address:
        # Nếu đã tồn tại, cập nhật địa chỉ giao hàng hiện có
        shipping_address.address = address
        shipping_address.save()
    else:
        # Nếu chưa tồn tại, tạo địa chỉ giao hàng mới
        shipping_address = ShippingAddress.objects.create(
            user=order.user, order=order, address=address
        )
    shipping_address_data = ShippingAddressSerializer(shipping_address).data

    # Lấy tất cả các OrderItem liên quan đến đơn hàng
    order_items = OrderItem.objects.filter(order=order)
    order_items_data = OrderItemSerializer(order_items, many=True).data

    response["errCode"] = 0
    response["errMessage"] = "Create Order successfully!"
    response["data"] = {
        "orderItems": order_items_data,
        "shippingAddress": shipping_address_data,
    }

    return response


# -----------------------------API list orders --------------------------
def get_list_order_service(user_id, status_key):
    response = {}
    user = User.objects.filter(id=user_id).first()
    if not user:
        response["errCode"] = 1
        response["errMessage"] = "User does not exist."
        return response

    # Lấy ra tất cả các Order của user này, có thể lọc theo trạng thái
    if status_key:
        orders = Order.objects.filter(user=user, status__key=status_key)
    else:
        orders = Order.objects.filter(user=user)

    if not orders.exists():
        response["errCode"] = 2
        response["errMessage"] = "Order not found."
        return response

    all_order_items = []
    shipping_address_data = []

    for order in orders:
        # Lấy tất cả các OrderItem cho đơn hàng hiện tại
        order_items = OrderItem.objects.filter(order=order)
        if order_items.exists():
            order_items_data = OrderItemSerializer(order_items, many=True).data
            total_order = 0
            for item in order_items_data:
                product = item["product"]
                selling_price = product["selling_price"] * (
                    (100 - product["discount"]) / 100
                )
                quantity = item["quantity"]
                total_price = selling_price * quantity
                total_order += total_price
                item["total_order"] = total_price
            all_order_items.append(order_items_data)

        # Lấy ra địa chỉ giao hàng đầu tiên của đơn hàng và người dùng của đơn hàng đó
        shipping_address = ShippingAddress.objects.filter(
            user=user, order=order
        ).first()
        if shipping_address:
            shipping_address_data.append(
                ShippingAddressSerializer(shipping_address).data
            )

    if not all_order_items:
        response["errCode"] = 3
        response["errMessage"] = "No items found in the order."
        return response

    if not shipping_address_data:
        response["errCode"] = 4
        response["errMessage"] = "Shipping address not found."
        return response

    response["errCode"] = 0
    response["errMessage"] = "Order retrieved successfully!"
    response["data"] = {
        "orderItems": all_order_items,
        "shippingAddress": shipping_address_data,
    }

    return response


# -----------------------------API canceled orders --------------------------
def cancel_order_service(order_id):
    response = {}
    order = Order.objects.get(id=order_id)
    if not order:
        response["errCode"] = 1
        response["errMessage"] = "Order not found."
        return response
    new_status = Allcode.objects.get(type="STATUS", key="S6")
    order.status = new_status
    order.save()
    # Cập nhật số lượng sản phẩm trong kho
    order_items = OrderItem.objects.filter(order=order)
    if not order_items.exists():
        response["errCode"] = 2
        response["errMessage"] = "No items found in the order."
        return response
    for item in order_items:
        product = Product.objects.get(id=item.product.id)
        product.quatity_stock += item.quantity
        product.save()
    response["errCode"] = 0
    response["errMessage"] = "Order canceled successfully!"
    return response


# -----------------------------API detail orders --------------------------
def get_detail_order_service(order_id):
    response = {}
    order = Order.objects.get(id=order_id)
    if not order:
        response["errCode"] = 1
        response["errMessage"] = "Order not found."
        return response
    order_items = OrderItem.objects.filter(order=order)
    if not order_items.exists():
        response["errCode"] = 2
        response["errMessage"] = "Order items not found."
        return response
    order_items_data = OrderItemSerializer(order_items, many=True).data
    total_order = 0
    total_quantity = 0
    for item in order_items_data:
        product = item["product"]
        selling_price = product["selling_price"] * ((100 - product["discount"]) / 100)
        quantity = item["quantity"]
        total_price = selling_price * quantity
        total_order += total_price
        total_quantity += quantity
        item["total_order"] = total_price
        item["total_quantity"] = total_quantity

    # Lấy ra địa chỉ giao hàng của đơn hàng
    shipping_address = ShippingAddress.objects.filter(order=order).first()
    shipping_address_data = (
        ShippingAddressSerializer(shipping_address).data if shipping_address else None
    )

    response["errCode"] = 0
    response["errMessage"] = "Order details retrieved successfully!"
    response["data"] = {
        "orderItems": order_items_data,
        "shippingAddress": shipping_address_data,
        "totalOrder": total_order,
        "totalQuantity" : total_quantity
    }

    return response
