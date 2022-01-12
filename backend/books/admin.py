from django.contrib import admin
from .models import Book, Rating


class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'author')


class RatingAdmin(admin.ModelAdmin):
    list_display = ('book', 'user', 'stars')


admin.site.register(Book, BookAdmin)
admin.site.register(Rating, RatingAdmin)
