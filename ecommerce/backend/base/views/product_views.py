from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Product, Review
from base.products import products
from base.serializers import ProductSerializer
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


@api_view(['GET'])
def get_products(request):
    query = request.query_params.get("keyword")
    if query == None:
        query = ''
    products = Product.objects.filter(name__icontains=query)

    page = request.query_params.get("page")
    paginator = Paginator(products, 6)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)
    

    if page == None:
        page = 1
    page = int(page)

    serializers = ProductSerializer(products, many=True)
    return Response({'products' : serializers.data, 'page' : page, 'pages' : paginator.num_pages})


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

    print(data)

    product = Product.objects.create(
        user=user, 
        name = data["name"], 
        brand = data["brand"], 
        category =data["category"], 
        price = data["price"], 
        countInStock = data["qty"],
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



@api_view(["PUT"])
@permission_classes([IsAdminUser])
def product_update_view(request, pk):
    product = Product.objects.get(_id=pk)
    user = request.user
    data = request.data

    product.user = user
    product.name = data["name"]
    product.brand = data["brand"]
    product.category = data["category"]
    product.countInStock = data["countInStock"]
    product.price = data["price"]
    product.description = data["description"]

    product.save()

    return Response({"detail" : "Product updated successfully "}, status=status.HTTP_200_OK)


@api_view(["POST"])
def upload_image_view(request):

    data = request.data
    product_id = data["product_id"]
    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get("image")

    product.save()

    return Response({"detail" : "Image uploaded successfully  "}, status=status.HTTP_200_OK)



@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_product_review_view(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)   
    data = request.data

    alreadyExists = product.review_set.filter(user=user).exists()
    if alreadyExists:
        message = {
            "detail" : "You already have reviewed this product "
        }
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
    elif data["rating"] == 0:
        message = {"detail" : "Please select a rating"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    else:
        review = Review.objects.create(
            user=user, 
            product=product, 
            name = user.first_name, 
            rating = data["rating"], 
            comment = data["comment"]
        )

        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0

        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()

        message = {
            "detail" : "Review added successfully "
        }

        return Response(message, status=status.HTTP_200_OK)



@api_view(["GET"])
def top_product_view(request):
    products = Product.objects.filter(rating__gt=4).order_by('-rating')[:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)