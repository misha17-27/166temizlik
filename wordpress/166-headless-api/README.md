# 166 Headless API

WordPress plugin for exposing clean REST data to the Next.js frontend.

## Install

Upload this folder to:

```txt
/wp-content/plugins/166-headless-api
```

Then activate **166 Headless API** in WordPress admin.

## Test

Open:

```txt
https://admin.166temizlik.az/wp-json/headless/v1/settings?lang=az
https://admin.166temizlik.az/wp-json/headless/v1/home?lang=az
https://admin.166temizlik.az/wp-json/headless/v1/services?lang=az
https://admin.166temizlik.az/wp-json/headless/v1/posts?lang=az
https://admin.166temizlik.az/wp-json/headless/v1/gallery?lang=az
https://admin.166temizlik.az/wp-json/headless/v1/partners?lang=az
```

## Home slides

Create between two and four published `slayd` records in Pods:

- Featured image: desktop slide image.
- `mobile_slide`: mobile slide image. The featured image is used when empty.
- `sort_order`: numeric display position. `1` is first.

WPML translations are used for `ru` and `tr`. Until a language has at least two valid translated slides, it inherits the AZ slides.

## Optional revalidation

Add to `wp-config.php` when the Next.js revalidation endpoint is ready. The plugin sends a JSON payload with `type`, `slug`, `lang`, `tags`, and `paths` after supported content is saved.

```php
define('ONE66_REVALIDATE_URL', 'https://166temizlik.vercel.app/api/revalidate');
define('ONE66_REVALIDATE_SECRET', 'replace-with-long-secret');
```

Set the same `ONE66_REVALIDATE_SECRET` value in Vercel for the frontend project. Redeploy the Vercel app after adding or changing the variable.

When the frontend is moved to `166temizlik.az`, either keep the Vercel URL or switch to the final domain:

```php
define('ONE66_REVALIDATE_URL', 'https://166temizlik.az/api/revalidate');
```

During domain migration, both URLs can be configured at the same time:

```php
define('ONE66_REVALIDATE_URLS', [
    'https://166temizlik.vercel.app/api/revalidate',
    'https://166temizlik.az/api/revalidate',
]);
define('ONE66_REVALIDATE_SECRET', 'replace-with-long-secret');
```
