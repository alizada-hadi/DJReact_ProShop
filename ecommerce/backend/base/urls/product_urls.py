from django.urls import path

from base.views import product_views


urlpatterns = [
    path("products/", product_views.get_products, name="products"), 
    path("product/<str:pk>/", product_views.product_detail, name="product-detail")
]


