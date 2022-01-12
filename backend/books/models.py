from django.db import models

from django.contrib.auth.models import User

from django.core.validators import MaxValueValidator, MinValueValidator


class Book(models.Model):
    image = models.ImageField(blank=True, null=True)
    title = models.CharField(max_length=30)
    author = models.CharField(max_length=30)

    def no_of_ratings(self):
        ratings = Rating.objects.filter(book=self)
        return len(ratings)

    def avg_rating(self):
        ratings = Rating.objects.filter(book=self)
        sum = 0
        for rating in ratings:
            sum += rating.stars
        if len(ratings) > 0:
            return round(sum / len(ratings), 1)
        else:
            return 0

    def __str__(self):
        return self.title


class Rating(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stars = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)])

    class Meta:
        unique_together = (('user', 'book'),)
        index_together = (('user', 'book'),)
