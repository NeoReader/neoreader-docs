"""Makes one dynamic QR code for each row of a CSV file (title,destination,folder) and prints the short URLs.

Needs the requests package. Run: NEOREADER_TOKEN=... python3 bulk_create_codes.py ../bulk/codes.csv
"""
import csv
import os
import sys
import time

import requests

base = os.environ.get("NEOREADER_API_URL", "https://neoreader.com/api/v1")
token = os.environ.get("NEOREADER_TOKEN") or sys.exit("Set NEOREADER_TOKEN to your API token")
headers = {"Authorization": f"Bearer {token}", "Accept": "application/json"}

with open(sys.argv[1] if len(sys.argv) > 1 else "../bulk/codes.csv", newline="") as handle:
    for row in csv.DictReader(handle):
        payload = {"title": row["title"], "destination": row["destination"]}
        if row.get("folder"):
            payload["folder"] = row["folder"]
        response = requests.post(f"{base}/codes", headers=headers, json=payload, timeout=30)
        data = response.json()
        print(data["data"]["short_url"] if response.status_code == 201 else f"{row['title']}: {data.get('message')}")
        # Over the rate limit: wait as long as the server says. Otherwise stay under 120 requests a minute.
        time.sleep(int(response.headers.get("Retry-After", 60)) if response.status_code == 429 else 0.6)
