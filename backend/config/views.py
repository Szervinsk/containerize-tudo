from django.http import JsonResponse


def health_check(request):
    """
    Endpoint de verificação de saúde e status da aplicação.
    Retorna payload JSON estruturado conforme especificado no desafio.
    """
    return JsonResponse({
        "status": "ok",
        "items": [
            "Configurar Docker",
            "Automatizar CI",
            "Publicar no GHCR"
        ]
    })
