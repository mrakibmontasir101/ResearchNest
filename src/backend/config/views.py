from django.db import connection
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


@api_view(['GET'])
@permission_classes([AllowAny])
def health(request):
    """Health check: the cloud platform calls this to see if the app is alive."""
    try:
        connection.ensure_connection()
        db_ok = True
    except Exception:
        db_ok = False
    return Response({'status': 'ok' if db_ok else 'degraded', 'database': db_ok},
                    status=200 if db_ok else 503)
