# Google Search Console handoff

## Property and indexing

1. Verify the URL-prefix property `https://www.recapmoments.app/` in the Google account that owns the site. The live host 308s `https://recapmoments.app/` to www; do not treat the apex hostname as canonical.
2. Submit `https://www.recapmoments.app/sitemap.xml`.
3. Use URL Inspection to request indexing for the homepage, `/zh/`, `/privacy/` and `/contact/`. Do not request indexing for `/v2/` (permanent redirect, disallowed in robots.txt) or for legal pages while `LEGAL_CONTENT_APPROVED=false`.

## Brand-query baseline

At 7, 28, and 90 days after submission, record impressions, clicks, CTR, and average position for:

- `Recap`
- `Recap photo`
- `Recap moments`

Treat improved impressions and association with the iPhone photo recap app as progress. Do not treat immediate first-page ranking for the generic query `Recap` as an acceptance criterion.
