from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Brand
from . import service
from .serializers import BrandSerializer
from rest_framework.permissions import IsAuthenticated


# Create your views here.
# ------------------API login-------------------------------
class LoginAPIView(APIView):
    # method post use login (login = post not get)
    def post(self, request):
        try:
            username = request.data.get("username")
            password = request.data.get("password")

            # kiểm tra nếu 1 trong 2 để trống thì báo lỗi
            if not username or not password:
                return Response(
                    {"errCode": 1, "errMessage": "Missing input parmater!"},
                    status=status.HTTP_200_OK,
                )

            # hàm xử lý login và trả về thông báo dạng json
            response = service.handle_user_login_service(username, password)
            return Response(
                {
                    "errCode": response["errCode"],
                    "errMessage": response["errMessage"],
                    "user": response.get("user", {}),
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {
                    "errCode": 500,
                    "errMessage": str(e),
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


# -----------------------------API user--------------------------------
# API Edit user
class EditUserAPIView(APIView):
    def put(self, request):
        try:
            data = request.data
            files = request.FILES
            response = service.update_user_data_service(data, files)
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {
                    "errCode": 500,
                    "errMessage": str(e),
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


# API Create
class CreateUserAPIView(APIView):
    def post(self, request):
        try:
            data = request.data
            files = request.FILES
            response = service.create_new_user_service(data, files)
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {
                    "errCode": 500,
                    "errMessage": str(e),
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


# API delete
class DeleteUserAPIView(APIView):
    def delete(self, request):
        try:
            data = request.data
            response = service.delete_user_service(data)
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {
                    "errCode": 500,
                    "errMessage": str(e),
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


# ---------------API all codes----------------------------
class GetAllCodeAPIView(APIView):
    def get(self, request):
        try:
            data = request.query_params.get("type")
            response = service.get_allcode_service(data)
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {
                    "errCode": 500,
                    "errMessage": str(e),
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


# -------------------------- API get all user by role-------------------------------
class GetAllUserByRoleAPIView(APIView):
    def get(self, request):
        try:
            role_key = request.query_params.get("role_id")
            response = service.get_user_by_role(role_key)
            return Response(response, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {
                    "errCode": 500,
                    "errMessage": str(e),
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


# ------------------------------API get brand----------------------
# lấy ra api của Product
class BrandAPIView(APIView):
    def get(self, request):
        try:
            data = request.data
            print(data)
            response = service.get_brand_service(data)
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {
                    "errCode": 500,
                    "errMessage": str(e),
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


# ----------------------------------API get product by category---------------------
class GetAllProductByCategoryAPIView(APIView):
    def get(self, request):
        try:
            category_key = request.query_params.get("category_id")
            response = service.get_all_products_by_category(category_key)
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {
                    "errCode": 500,
                    "errMessage": str(e),
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


# ----------------------------------API delete product by id---------------------
class DeleteProductAPIView(APIView):
    def delete(self, request):
        try:
            data = request.data
            response = service.delete_product_by_id(data)
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {
                    "errCode": 500,
                    "errMessage": str(e),
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


# ----------------------------------API edit product by id---------------------
class EditProductAPIView(APIView):
    def put(self, request):
        try:
            data = request.data
            files = request.FILES
            response = service.edit_product_by_id(data , files)
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {
                    "errCode": 500,
                    "errMessage": str(e),
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


# ----------------------------------API create product---------------------
class CreateProductAPIView(APIView):
    def post(self, request):
        try:
            data = request.data
            files = request.FILES
            response = service.create_new_product_service(data,files)
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {
                    "errCode": 500,
                    "errMessage": str(e),
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


# -----------------------------API address user--------------------------
class CreateAddressAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user = request.data
            response = service.create_address_service(user)
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {
                    "errCode": 500,
                    "errMessage": str(e),
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
