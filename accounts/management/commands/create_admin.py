import os

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

User = get_user_model()


def create_or_update_superuser(username, email, password):
    user, created = User.objects.get_or_create(
        username=username,
        defaults={"email": email},
    )
    user.email = email
    user.is_staff = True
    user.is_superuser = True
    user.set_password(password)
    user.save()
    return created


class Command(BaseCommand):
    help = "Create or update up to two superusers from env vars."

    def handle(self, *args, **options):
        # Admin 1
        username1 = os.environ.get("ADMIN_USERNAME")
        email1 = os.environ.get("ADMIN_EMAIL")
        password1 = os.environ.get("ADMIN_PASSWORD")

        # Admin 2 (optional)
        username2 = os.environ.get("ADMIN2_USERNAME")
        email2 = os.environ.get("ADMIN2_EMAIL")
        password2 = os.environ.get("ADMIN2_PASSWORD")

        if not all([username1, email1, password1]):
            self.stdout.write(
                self.style.WARNING(
                    "ADMIN_USERNAME / ADMIN_EMAIL / ADMIN_PASSWORD not all set — "
                    "skipping admin #1 creation."
                )
            )
        else:
            created1 = create_or_update_superuser(username1, email1, password1)
            if created1:
                self.stdout.write(self.style.SUCCESS(f"Created superuser '{username1}'."))
            else:
                self.stdout.write(self.style.SUCCESS(f"Updated existing superuser '{username1}'."))

        if not all([username2, email2, password2]):
            self.stdout.write(
                self.style.WARNING(
                    "ADMIN2_USERNAME / ADMIN2_EMAIL / ADMIN2_PASSWORD not all set — "
                    "skipping admin #2 creation."
                )
            )
        else:
            created2 = create_or_update_superuser(username2, email2, password2)
            if created2:
                self.stdout.write(self.style.SUCCESS(f"Created superuser '{username2}'."))
            else:
                self.stdout.write(self.style.SUCCESS(f"Updated existing superuser '{username2}'."))
