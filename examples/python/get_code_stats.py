import os
import sys

import requests

base = os.environ.get("NEOREADER_API_URL", "https://neoreader.com/api/v1")
token = os.environ.get("NEOREADER_TOKEN") or sys.exit("Set NEOREADER_TOKEN to your API token")
if "NEOREADER_SLUG" not in os.environ:
    sys.exit("Set NEOREADER_SLUG to the slug of one of your codes")

response = requests.get(
    f"{base}/codes/{os.environ['NEOREADER_SLUG']}/stats",
    headers={"Authorization": f"Bearer {token}", "Accept": "application/json"},
    params={"days": "7"},
    timeout=30,
)
print(response.status_code, response.json())
