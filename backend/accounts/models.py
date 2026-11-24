from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """One account for every person. Extra roles are granted separately (FR-ACC-04)."""

    email = models.EmailField(unique=True)
    email_verified = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email
