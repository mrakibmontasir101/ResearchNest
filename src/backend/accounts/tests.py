from django.contrib.auth import get_user_model
from django.test import TestCase


class UserModelTests(TestCase):
    def test_user_logs_in_with_email(self):
        user = get_user_model().objects.create_user(
            username="student1", email="student1@example.com", password="a-strong-password"
        )
        self.assertEqual(get_user_model().USERNAME_FIELD, "email")
        self.assertFalse(user.email_verified)  # new emails start unverified (FR-ACC-02)
        self.assertTrue(user.check_password("a-strong-password"))  # stored as a hash (NFR-SEC-01)
        self.assertNotEqual(user.password, "a-strong-password")


class HealthCheckTests(TestCase):
    def test_health_reports_ok(self):
        response = self.client.get("/api/health")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "ok", "database": True})
