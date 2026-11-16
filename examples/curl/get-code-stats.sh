#!/usr/bin/env sh
: "${NEOREADER_TOKEN:?Set NEOREADER_TOKEN to your API token}"
: "${NEOREADER_SLUG:?Set NEOREADER_SLUG to the slug of one of your codes}"
: "${NEOREADER_API_URL:=https://neoreader.com/api/v1}"
curl -sS -X GET "$NEOREADER_API_URL/codes/$NEOREADER_SLUG/stats?days=7" \
  -H "Authorization: Bearer $NEOREADER_TOKEN" \
  -H "Accept: application/json"
