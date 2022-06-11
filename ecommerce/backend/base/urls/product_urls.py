from django.urls import path

from base.views import product_views


urlpatterns = [
    path("products/", product_views.get_products, name="products"), 
    path("product/upload/photo/", product_views.upload_image_view, name="upload-image"),
    path("product/create/", product_views.create_product_view, name="product-create"),
    path("product/<str:pk>/", product_views.product_detail, name="product-detail"), 
    path("product/<str:pk>/delete/", product_views.delete_product_view, name="delete-product"), 
    path("product/<str:pk>/update/", product_views.product_update_view, name="product-update")
]


