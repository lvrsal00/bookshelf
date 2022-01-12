from rest_framework import viewsets, status
from .serializers import BookSerializer, UserSerializer, RatingSerializer
from .models import Book, Rating
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework.decorators import action


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny, )


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )

    """ @action(detail=True, methods=['POST'])
    def rate_book(self, request, pk=None):
        if 'stars' in request.data:
            book = Book.objects.get(id=pk)
            stars = request.data['stars']
            user = request.user
            try:
                rating = Rating.objects.get(user=user.id, book=book.id)
                rating.stars = stars
                rating.save()
                serializer = RatingSerializer(rating, many=False)
                response = {'message': 'rating updated',
                            'result': serializer.data}
                return Response(response, status=status.HTTP_200_OK)
            except:
                rating = Rating.objects.create(
                    user=user, book=book, stars=stars)
                serializer = RatingSerializer(rating, many=False)
                response = {'message': 'rating created',
                            'result': serializer.data}
                return Response(response, status=status.HTTP_200_OK)
        else:
            response = {'message': 'you need to provide stars'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST) """


class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )

    """ def update(self, request, *args, **kwargs):
        response = {'message': 'you cant update rating like that'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):
        response = {'message': 'you cant create rating like that'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST) """
