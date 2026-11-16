import os
import sys

import requests

base = os.environ.get("NEOREADER_API_URL", "https://neoreader.com/api/v1")
token = os.environ.get("NEOREADER_TOKEN") or sys.exit("Set NEOREADER_TOKEN to your API token")
if "NEOREADER_SLUG" not in os.environ:
    sys.exit("Set NEOREADER_SLUG to the slug of one of your codes")

response = requests.patch(
    f"{base}/codes/{os.environ['NEOREADER_SLUG']}",
    headers={"Authorization": f"Bearer {token}", "Accept": "application/json"},
    json={
        "destination": "https://example.com/summer-menu",
        "expires_at": "2026-12-31T23:59:00Z"
    },
    timeout=30,
)
print(response.status_code, response.json())
