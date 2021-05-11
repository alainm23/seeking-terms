curl -v -X POST https://api-m.sandbox.paypal.com/v1/catalogs/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer A21AALD9TyPsrB456-L9fgp56iwbMm_faQ6yXWd6RVIXGWHkdkQ1HMfwq3JBw3zEbw0hSashdDsHeCvEOoyF8b-Oz_Wt-slhQ" \
-d '{
  "name": "Seeking Terms",
  "description": "Seeking Terms",
  "type": "SERVICE",
  "category": "SOFTWARE",
  "image_url": "https://example.com/streaming.jpg",
  "home_url": "https://example.com/home"
}'

// ID: PROD-7PG89106D2627631P