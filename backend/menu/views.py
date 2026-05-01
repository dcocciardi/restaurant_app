from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Category

@api_view(['GET'])
def get_menu(request):
    categories = Category.objects.prefetch_related('dishes').all()

    data = []
    for category in categories:
        data.append({
            "id": category.id,
            "name": category.name,
            "slug": category.slug,
            "dishes": [
                {
                    "id": dish.id,
                    "name": dish.name,
                    "price": float(dish.price),
                    "image": dish.image.url if dish.image else None,
                    "is_customisable": dish.is_customisable,
                    "is_vegetarian": dish.is_vegetarian,
                    "is_vegan": dish.is_vegan,
                }
                for dish in category.dishes.filter(is_available=True)
            ]
        })

    return Response(data)