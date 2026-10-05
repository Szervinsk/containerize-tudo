from django.test import Client, SimpleTestCase


class HealthCheckTestCase(SimpleTestCase):
    def setUp(self):
        self.client = Client()

    def test_health_check_status_code(self):
        response = self.client.get('/api/health/')
        self.assertEqual(response.status_code, 200)

    def test_health_check_payload_structure(self):
        response = self.client.get('/api/health/')
        data = response.json()
        self.assertEqual(data.get('status'), 'ok')
        self.assertIsInstance(data.get('items'), list)
        self.assertIn('Configurar Docker', data['items'])
        self.assertIn('Automatizar CI', data['items'])
        self.assertIn('Publicar no GHCR', data['items'])
