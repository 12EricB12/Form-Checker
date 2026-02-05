from django.db import models

# Create your models here.
class Register(models.Model):
    user = models.TextField(max_length=20)
    password = models.TextField(max_length=20)
    date = models.DateField(auto_now=True)
    slug = models.SlugField()
