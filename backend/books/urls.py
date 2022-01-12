from django.urls import path
from rest_framework import routers
from django.conf.urls import include
from .views import BookViewSet, RatingViewSet, UserViewSet


router = routers.DefaultRouter()

router.register('books', BookViewSet)
router.register('ratings', RatingViewSet)
router.register('users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
