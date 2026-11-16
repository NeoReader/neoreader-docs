#!/usr/bin/env sh
# Makes one dynamic QR code for each row of a CSV file (title,destination,folder) and prints the short URLs.
# Needs jq. Run: sh bulk-create-codes.sh ../bulk/codes.csv
: "${NEOREADER_TOKEN:?Set NEOREADER_TOKEN to your API token}"
: "${NEOREADER_API_URL:=https://neoreader.com/api/v1}"
file="${1:-../bulk/codes.csv}"

tail -n +2 "$file" | while IFS=, read -r title destination folder; do
  jq -n --arg title "$title" --arg destination "$destination" --arg folder "$folder" \
    '{title: $title, destination: $destination} + (if $folder == "" then {} else {folder: $folder} end)' |
  curl -sS -X POST "$NEOREADER_API_URL/codes" \
    -H "Authorization: Bearer $NEOREADER_TOKEN" \
    -H "Accept: application/json" \
    -H "Content-Type: application/json" \
    -d @- | jq -r '.data.short_url // .message'
  sleep 0.6 # stays under 120 requests a minute
done
