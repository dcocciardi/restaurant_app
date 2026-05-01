from django.contrib import admin
from .models import Category, Dish, Allergen


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "order")
    prepopulated_fields = {"slug": ("name",)}

@admin.register(Allergen)
class AllergenAdmin(admin.ModelAdmin):
    list_display = ("number", "name")
    ordering = ("number",)

@admin.register(Dish)
class DishAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "price", "is_available")
    list_filter = ("category", "is_available")
    search_fields = ("name",)
    filter_horizontal = ("allergens",)