curl -v -k -X POST https://api-m.sandbox.paypal.com/v1/billing/plans \
  -H "Accept: application/json" \
  -H "Authorization: Bearer A21AALD9TyPsrB456-L9fgp56iwbMm_faQ6yXWd6RVIXGWHkdkQ1HMfwq3JBw3zEbw0hSashdDsHeCvEOoyF8b-Oz_Wt-slhQ" \
  -H "Prefer: return=representation" \
  -H "Content-Type: application/json" \
  -d '{
      "product_id": "PROD-7PG89106D2627631P",
      "name": "Basic Plan",
      "description": "Basic plan",
      "billing_cycles": [
        {
          "frequency": {
            "interval_unit": "DAY",
            "interval_count": 1
          },
          "tenure_type": "REGULAR",
          "sequence": 1,
          "total_cycles": 0,
          "pricing_scheme": {
            "fixed_price": {
              "value": "50",
              "currency_code": "USD"
            }
          }
        }
      ],
      "payment_preferences": {
        "auto_bill_outstanding": true,
        "payment_failure_threshold": 3
      }
    }'

// ID: P-6JJ77826WP330435HMCNKN7A