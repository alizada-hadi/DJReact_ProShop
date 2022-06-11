from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Product, Order, OrderItem, ShippingAddress
from base.products import products

from rest_framework import status
from base.serializers import OrderSerializer
from datetime import date, datetime


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_order_items(request):
    user = request.user
    data = request.data

    orderItems = data["orderItems"]
    if orderItems and len(orderItems) == 0:
        return Response({"detail" : "No order items"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        order = Order.objects.create(
            user=user, 
            paymentMethod=data["paymentMethod"], 
            taxPrice = data["taxPrice"],
            shippingPrice = data["shippingPrice"],
            totalPrice = data["totalPrice"],
        )

        shippint = ShippingAddress.objects.create(
            order=order, 
            address = data["shippingAddress"]["address"], 
            city = data["shippingAddress"]["city"],
            postalCode = data["shippingAddress"]["postalCode"],
            country = data["shippingAddress"]["country"],
        )

        for i in orderItems:
            product = Product.objects.get(_id=i["product"])

            item = OrderItem.objects.create(
                product=product, 
                order=order, 
                name=product.name, 
                qty=i["qty"], 
                price = i["price"], 
                image=product.image.url
            )

        product.countInStock -= item.qty
        product.save()

        serializer = OrderSerializer(order, many=False)

        return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_order_view(request, pk):

    user = request.user

    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            return Response({"detail" : 'You are not authorized to view this page'}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({
            "detail" : "Order with this id does not exists "
        }, status=status.HTTP_400_BAD_REQUEST)



@api_view(["PUT"])
# @permission_classes([IsAdminUser])
def update_order_view(request, pk):
    order = Order.objects.get(_id=pk)

    print(order)

    order.isPaid = True
    order.paidAt = datetime.now()

    order.save()

    return Response("Order was paid")




@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_orders_view(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)

    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def order_list_view(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)

    return Response(serializer.data)