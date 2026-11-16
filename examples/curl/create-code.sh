#!/usr/bin/env sh
: "${NEOREADER_TOKEN:?Set NEOREADER_TOKEN to your API token}"
: "${NEOREADER_API_URL:=https://neoreader.com/api/v1}"
curl -sS -X POST "$NEOREADER_API_URL/codes" \
  -H "Authorization: Bearer $NEOREADER_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"title":"Spring menu","destination":"https://example.com/menu","folder":"Restaurant","utm":{"utm_source":"qr","utm_medium":"print"}}'
