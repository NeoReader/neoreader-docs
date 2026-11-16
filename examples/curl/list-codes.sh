#!/usr/bin/env sh
: "${NEOREADER_TOKEN:?Set NEOREADER_TOKEN to your API token}"
: "${NEOREADER_API_URL:=https://neoreader.com/api/v1}"
curl -sS -X GET "$NEOREADER_API_URL/codes?status=active&per_page=10" \
  -H "Authorization: Bearer $NEOREADER_TOKEN" \
  -H "Accept: application/json"
