#!/usr/bin/env sh
: "${NEOREADER_TOKEN:?Set NEOREADER_TOKEN to your API token}"
: "${NEOREADER_SLUG:?Set NEOREADER_SLUG to the slug of one of your codes}"
: "${NEOREADER_API_URL:=https://neoreader.com/api/v1}"
curl -sS -X PATCH "$NEOREADER_API_URL/codes/$NEOREADER_SLUG" \
  -H "Authorization: Bearer $NEOREADER_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"destination":"https://example.com/summer-menu","expires_at":"2026-12-31T23:59:00Z"}'
