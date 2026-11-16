import os
import sys

import requests

base = os.environ.get("NEOREADER_API_URL", "https://neoreader.com/api/v1")
token = os.environ.get("NEOREADER_TOKEN") or sys.exit("Set NEOREADER_TOKEN to your API token")

response = requests.post(
    f"{base}/codes",
    headers={"Authorization": f"Bearer {token}", "Accept": "application/json"},
    json={
        "title": "Spring menu",
        "destination": "https://example.com/menu",
        "folder": "Restaurant",
        "utm": {
            "utm_source": "qr",
            "utm_medium": "print"
        }
    },
    timeout=30,
)
print(response.status_code, response.json())
