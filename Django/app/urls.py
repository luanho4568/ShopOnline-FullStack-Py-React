import debug_toolbar
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions


schema_view = get_schema_view(
    openapi.Info(
        title="Web Store API",
        default_version="v1",
        description="Get API Render UI for React",
        contact=openapi.Contact(email="luanho@gmail.com"),
        license=openapi.License(name="Hồ Đình Thanh Luân"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)



urlpatterns = [
    path("admin/", admin.site.urls),
    # router
    # API
    path(
        "swagger<format>/", schema_view.without_ui(cache_timeout=0), name="schema-json"
    ),
    path(
        "",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
    path("__debug__/", include(debug_toolbar.urls)),
    # API login
    path("api/login", views.LoginAPIView.as_view(), name="login"),
    # API user
    path("api/edit-user", views.EditUserAPIView.as_view(), name="edit"),
    path("api/create-new-user", views.CreateUserAPIView.as_view(), name="create"),
    path("api/delete-user", views.DeleteUserAPIView.as_view(), name="delete"),
    # API ALl code type
    path("api/allcode", views.GetAllCodeAPIView.as_view(), name="allcode"),
    # API get_all_user_role
    path("api/users-by-role", views.GetAllUserByRoleAPIView.as_view(), name="users-by-role"),
    # API get_brand
    path('api/get-brands', views.BrandAPIView.as_view(), name='get_all_brands'),
    #API get products by category
    path('api/products-by-category', views.GetAllProductByCategoryAPIView.as_view(), name='products-by-category'),
    # API delete products
    path('api/product-delete',views.DeleteProductAPIView.as_view(), name='products-delete'),
    # API update product
    path('api/product-edit',views.EditProductAPIView.as_view(), name='products-edit'),
    # API create new product
    path("api/create-new-product", views.CreateProductAPIView.as_view(), name="create-product"),
    # API get details product
    path('api/product-details', views.GetDetailsProductAPIView.as_view(), name='product-details'),
    # API get details user
    path('api/user-details', views.GetDetailsUserAPIView.as_view(), name='user-details'),
    # API get address user
    path('api/address-user', views.GetAddressUserAPIView.as_view(), name='address-user'),
    # API edit address user
    path('api/address-edit',views.EditAddressAPIView.as_view(), name='address-edit'),
    # API update password user
    path('api/update-password',views.UpdatePasswordAPIView.as_view(), name='update-password'),
]
