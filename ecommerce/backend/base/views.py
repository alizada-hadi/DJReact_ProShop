from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .products import products

def get_routes(request):
    return JsonResponse("hello", safe=False)


@api_view(['GET'])
def get_products(request):
    return Response(products)


@api_view(['GET'])
def product_detail(request, pk):
    product = None
    for i in products:
        if i['_id'] == pk:
            product = i
            break
    return Response(product)

