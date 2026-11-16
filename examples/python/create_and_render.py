"""Makes a dynamic code with the API, then draws its QR image on your own machine from the short URL.

The image holds the short URL, so changing the destination later never means reprinting.
Needs the requests and qrcode packages: pip install requests "qrcode[pil]"
Run: NEOREADER_TOKEN=... python3 create_and_render.py
"""
import os
import sys

import qrcode
import requests

base = os.environ.get("NEOREADER_API_URL", "https://neoreader.com/api/v1")
token = os.environ.get("NEOREADER_TOKEN") or sys.exit("Set NEOREADER_TOKEN to your API token")

response = requests.post(
    f"{base}/codes",
    headers={"Authorization": f"Bearer {token}", "Accept": "application/json"},
    json={"title": "Spring menu", "destination": "https://example.com/menu"},
    timeout=30,
)
code = response.json()["data"]

image = qrcode.make(code["short_url"], error_correction=qrcode.constants.ERROR_CORRECT_M, box_size=20, border=2)
image.save(f"{code['slug']}.png")
print(f"{code['short_url']} -> {code['slug']}.png")
