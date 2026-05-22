# WordPress Headless Plan

## Цель

Использовать `admin.166temizlik.az` как WordPress CMS и админку, а публичный сайт оставить на Next.js/Vercel. После завершения интеграции основной домен `166temizlik.az` можно направить на Vercel, а WordPress оставить только на поддомене `admin`.

Схема:

```txt
Пользователь -> 166temizlik.az -> Vercel / Next.js frontend
Редактор -> admin.166temizlik.az/wp-admin -> WordPress / WPML / ACF
Next.js -> admin.166temizlik.az/wp-json/headless/v1 -> структурированный контент
```

## Что есть в бэкапе

Бэкап `D:\166\21.05.2026 Rect` содержит полный WordPress:

- SQL: `temizlik_dbb.sql`
- Архив файлов: `166temiz21.05.26.zip`
- Табличный префикс: `wpzo_`
- Активная тема: `hello-elementor`
- Языки WPML: `az`, `ru`, `tr`
- Основные типы контента:
  - `page`: 86
  - `post`: 73
  - `vakansiya`: 6
  - `emakdaslar`: 33
  - `attachment`: 2414

В WordPress уже есть Elementor, Elementor Pro, ACF Pro, ACF Multilingual, WPML, WPML String Translation, WPML Media, Yoast, WP Rocket, Slider Revolution и другие плагины.

## Почему нужен отдельный headless API

Сейчас большая часть дизайна страниц хранится в Elementor JSON/HTML. Для текущего фронта это плохой источник данных:

- HTML Elementor не совпадает с компонентной структурой текущего фронта.
- Сложно стабильно поддерживать адаптивность.
- Любое изменение Elementor-разметки может сломать парсинг.
- WPML-переводы лучше отдавать уже нормализованными.

Поэтому нужен небольшой WP-плагин `166 Headless API`, который отдаёт чистый JSON: заголовки, тексты, фото, галереи, SEO, ACF-поля и переводы.

## Плагин

Файл плагина находится здесь:

```txt
wordpress/166-headless-api/166-headless-api.php
```

Установка:

1. Загрузить папку `166-headless-api` в `/wp-content/plugins/`.
2. Активировать плагин в WordPress.
3. Проверить endpoint:

```txt
https://admin.166temizlik.az/wp-json/headless/v1/settings?lang=az
```

## Endpoints

Base URL:

```txt
https://admin.166temizlik.az/wp-json/headless/v1
```

Доступные endpoints:

```txt
GET /settings?lang=az
GET /menus?lang=az
GET /pages?lang=az&page=1&per_page=20
GET /pages/{slug}?lang=az
GET /services?lang=az
GET /services/{slug}?lang=az
GET /posts?lang=az&page=1&per_page=9
GET /posts/{slug}?lang=az
GET /vacancies?lang=az&page=1&per_page=20
GET /vacancies/{slug}?lang=az
GET /employees?lang=az
GET /gallery?lang=az
POST /revalidate
```

Каждый item возвращает:

- `id`
- `type`
- `slug`
- `language`
- `translations`
- `title`
- `excerpt`
- `content`
- `featuredImage`
- `acf`
- `seo`
- `link`
- `date`
- `modified`

## ACF model

### Global settings

Лучше добавить ACF Options Page и хранить там:

- `site_logo`
- `site_logo_dark`
- `favicon`
- `phone_primary`
- `phone_secondary`
- `email`
- `address`
- `social_facebook`
- `social_instagram`
- `social_whatsapp`
- `social_youtube`
- `footer_cta_title`
- `footer_cta_primary_label`
- `footer_cta_primary_url`
- `footer_cta_secondary_label`
- `footer_cta_secondary_url`
- `order_popup_title`
- `gallery_categories`
- `gallery_items`
- `gallery_video_url`

### Home page

- `hero_slides`: repeater
  - `desktop_image`
  - `mobile_image`
  - `background_color`
  - `language`
- `partners`: repeater
  - `logo`
  - `name`
  - `url`

### Service pages

Все услуги остаются WordPress pages. Для них нужны поля:

- `service_key`: canonical slug для фронта.
- `nav_label`
- `hero_image`
- `hero_title`
- `hero_subtitle`
- `intro_blocks`: repeater
  - `image`
  - `text`
  - `image_position`
- `included_title`
- `included_gallery`: gallery
- `included_items`: repeater
  - `text`
  - `style`: `blue` или `yellow`
- `included_note`
- `price_blocks`: repeater
  - `title`
  - `items`
  - `prices`
- `note_image`
- `note_items`: repeater
- `order_form_default_service`
- `bottom_cta_image`
- `bottom_cta_text`

Canonical service slugs:

```txt
ev-temizliyi-xidmeti
ofis-temizliyi
bag-evlerinin-temizliyi
erazi-temizliyi
fasad-temizliyi
pencere-temizliyi
cilciraq-temizliyi
perde-yuma
yumsaq-mebel-temizlenmesi
etirlendirme
baximsiz-ev-temizliyi
yangindan-sonra-ev-temizliyi
temir-sonrasi-temizlik
otel-temizlenmesi
restoran-temizlenmesi
hovuz-temizlenmesi-xidmeti
kristallasdirma-xidmeti
korporativ-temizlik-xidmeti
```

### Blog

Использовать native `post`:

- title
- slug
- featured image
- excerpt
- content
- Yoast SEO
- WPML translations

### Vacancies

Использовать CPT `vakansiya`:

- title
- short excerpt
- content
- requirements
- responsibilities
- apply button/form text
- WPML translations

### Employees

Использовать CPT `emakdaslar`:

- name/title
- photo
- position
- social/contact fields if needed

## Next.js integration

Добавить env:

```txt
WORDPRESS_API_URL=https://admin.166temizlik.az/wp-json/headless/v1
NEXT_PUBLIC_SITE_URL=https://166temizlik.az
REVALIDATE_SECRET=<long-random-secret>
```

Добавить `admin.166temizlik.az` в `next.config.ts` для remote images.

Подключение делать по шагам:

1. `settings` и `menus`
2. `services` и `services/{slug}`
3. `posts` и blog pagination
4. `vacancies`
5. `gallery`
6. ISR/revalidate

## Revalidation

В `wp-config.php` можно добавить:

```php
define('ONE66_REVALIDATE_URL', 'https://166temizlik.az/api/revalidate');
define('ONE66_REVALIDATE_SECRET', 'same-secret-as-vercel');
```

Плагин будет отправлять POST при сохранении `page`, `post`, `vakansiya`, `emakdaslar`.

## Security

- Не подключать Next.js напрямую к MySQL.
- Ограничить CORS только доменами фронта.
- Закрыть `admin.166temizlik.az` от индексации.
- Оставить Cloudflare/WAF для админки.
- После настройки желательно сменить переданные FTP/DB пароли, так как они уже были раскрыты в переписке.

## Domain switch

Когда фронт будет читать данные из WordPress:

1. Проверить `admin.166temizlik.az` как CMS.
2. Проверить preview/staging на Vercel.
3. Добавить `166temizlik.az` и `www.166temizlik.az` в Vercel.
4. Поменять DNS основного домена на Vercel.
5. Оставить WordPress на `admin.166temizlik.az`.
