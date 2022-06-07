from django.urls import path
from base.views import order_views


urlpatterns = [
    path("add/", order_views.add_order_items, name="orders-add"), 
    path("mine/", order_views.my_orders_view, name="my-orders"),
    path("<str:pk>/", order_views.get_order_view, name="order-detail"),
    path("<str:pk>/pay/", order_views.update_order_view, name="pay")
]