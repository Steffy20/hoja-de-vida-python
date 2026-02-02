import os

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Create or update a superuser from env vars if needed."

    def handle(self, *args, **options):
        username = os.environ.get("DJANGO_SUPERUSER_USERNAME")
        email = os.environ.get("DJANGO_SUPERUSER_EMAIL", "")
        password = os.environ.get("DJANGO_SUPERUSER_PASSWORD")

        if not username or not password:
            self.stdout.write("Skipping superuser creation (missing env vars).")
            return

        User = get_user_model()
        user = User.objects.filter(username=username).first()

        if user:
            updated = False
            if not user.is_staff:
                user.is_staff = True
                updated = True
            if not user.is_superuser:
                user.is_superuser = True
                updated = True
            if password:
                user.set_password(password)
                updated = True
            if email and user.email != email:
                user.email = email
                updated = True
            if updated:
                user.save()
                self.stdout.write("Updated existing user to superuser.")
            else:
                self.stdout.write("Superuser already exists.")
            return

        User.objects.create_superuser(username=username, email=email, password=password)
        self.stdout.write("Superuser created.")
