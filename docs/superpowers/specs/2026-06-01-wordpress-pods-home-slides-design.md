# WordPress Pods Home Slides

## Goal

Manage the home-page slider from WordPress without frontend code changes when slides are added, removed, or reordered.

## WordPress Source

- Custom post type: `slayd`
- Include only published records.
- Desktop image: post featured image.
- Mobile image: Pods field `mobile_slide`.
- Sort position: Pods field `sort_order`.

## API Contract

The existing `GET /wp-json/headless/v1/home?lang=<locale>` endpoint returns slides in `mappedAcf.heroSlides`.

Each valid slide contains:

```json
{
  "title": "Optional post title",
  "desktopImage": { "url": "..." },
  "mobileImage": { "url": "..." }
}
```

Rules:

- Sort by numeric `sort_order` ascending. `1` is first.
- Return at most four slides.
- Ignore records without a featured image.
- If `mobile_slide` is empty, use the featured image for mobile.
- If fewer than two valid WordPress slides exist, return no Pods slides so the frontend keeps its current local banners.
- Use WPML translations for `ru` and `tr`. Until a language has at least two valid translated slides, inherit the AZ slides.

## Frontend

The frontend already consumes `mappedAcf.heroSlides`. No visual component changes are required.

## Verification

- Confirm `/home` returns zero Pods slides while fewer than two valid published records exist.
- After two records are published, confirm `/home` returns them in `sort_order` order.
- Run `npm run lint` and `npm run build`.
- Build a plugin ZIP for WordPress upload.
