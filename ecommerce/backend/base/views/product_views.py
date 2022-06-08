from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Product
from base.products import products
from base.serializers import ProductSerializer
from rest_framework import status


@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    serializers = ProductSerializer(products, many=True)
    return Response(serializers.data)


@api_view(['GET'])
def product_detail(request, pk):
    product = Product.objects.get(_id=pk)
    serializers = ProductSerializer(product, many=False)
    return Response(serializers.data)



@api_view(["POST"])
@permission_classes([IsAdminUser])
def create_product_view(request):
    user = request.user
    data = request.data

    product = Product.objects.create(
        user=user, 
        name = data["name"], 
        brand = data["brand"], 
        category =data["category"], 
        price = data["price"], 
        description = data["description"]
    )

    serializer = ProductSerializer(product, many=False)

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def delete_product_view(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response({"detail" : "Product deleted successfully "}, status=status.HTTP_200_OK)


