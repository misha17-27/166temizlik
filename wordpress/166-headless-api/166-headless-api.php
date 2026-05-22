<?php
/**
 * Plugin Name: 166 Headless API
 * Description: Headless REST endpoints for the 166 Temizlik Next.js frontend.
 * Version: 0.2.0
 * Author: 166 Temizlik
 */

if (!defined('ABSPATH')) {
    exit;
}

final class One66_Headless_API
{
    private const NAMESPACE = 'headless/v1';

    private const LANGUAGES = ['az', 'ru', 'tr'];

    private const SERVICE_SLUGS = [
        'ev-temizliyi-xidmeti',
        'ofis-temizliyi',
        'bag-evlerinin-temizliyi',
        'erazi-temizliyi',
        'fasad-temizliyi',
        'pencere-temizliyi',
        'cilciraq-temizliyi',
        'perde-yuma',
        'yumsaq-mebel-temizlenmesi',
        'etirlendirme',
        'baximsiz-ev-temizliyi',
        'yangindan-sonra-ev-temizliyi',
        'temir-sonrasi-temizlik',
        'otel-temizlenmesi',
        'restoran-temizlenmesi',
        'hovuz-temizlenmesi-xidmeti',
        'kristallasdirma-xidmeti',
        'korporativ-temizlik-xidmeti',
    ];

    public static function boot(): void
    {
        add_action('rest_api_init', [self::class, 'register_routes']);
        add_filter('rest_pre_serve_request', [self::class, 'cors_headers'], 10, 4);
        add_action('save_post', [self::class, 'notify_frontend_revalidate'], 20, 2);
    }

    public static function register_routes(): void
    {
        self::read_route('/settings', 'settings');
        self::read_route('/menus', 'menus');
        self::read_route('/pages', 'pages', self::pagination_args());
        self::read_route('/pages/(?P<slug>[a-zA-Z0-9_%-]+)', 'page_by_slug', self::slug_args());
        self::read_route('/services', 'services');
        self::read_route('/services/(?P<slug>[a-zA-Z0-9_%-]+)', 'service_by_slug', self::slug_args());
        self::read_route('/posts', 'posts', self::pagination_args());
        self::read_route('/posts/(?P<slug>[a-zA-Z0-9_%-]+)', 'post_by_slug', self::slug_args());
        self::read_route('/vacancies', 'vacancies', self::pagination_args());
        self::read_route('/vacancies/(?P<slug>[a-zA-Z0-9_%-]+)', 'vacancy_by_slug', self::slug_args());
        self::read_route('/employees', 'employees');
        self::read_route('/gallery', 'gallery');

        register_rest_route(self::NAMESPACE, '/revalidate', [
            'methods' => WP_REST_Server::CREATABLE,
            'callback' => [self::class, 'revalidate'],
            'permission_callback' => [self::class, 'verify_revalidate_secret'],
        ]);
    }

    public static function settings(WP_REST_Request $request): WP_REST_Response
    {
        $lang = self::request_lang($request);
        self::switch_language($lang);

        return self::response([
            'lang' => $lang,
            'siteName' => get_bloginfo('name'),
            'description' => get_bloginfo('description'),
            'homeUrl' => home_url('/'),
            'logo' => self::option_image('site_logo'),
            'logoDark' => self::option_image('site_logo_dark'),
            'favicon' => self::option_image('favicon'),
            'phonePrimary' => self::option_text('phone_primary'),
            'phoneSecondary' => self::option_text('phone_secondary'),
            'email' => self::option_text('email'),
            'address' => self::option_text('address'),
            'footer' => [
                'ctaTitle' => self::option_text('footer_cta_title'),
                'primaryLabel' => self::option_text('footer_cta_primary_label'),
                'primaryUrl' => self::option_text('footer_cta_primary_url'),
                'secondaryLabel' => self::option_text('footer_cta_secondary_label'),
                'secondaryUrl' => self::option_text('footer_cta_secondary_url'),
            ],
            'orderPopup' => [
                'title' => self::option_text('order_popup_title'),
            ],
            'social' => [
                'facebook' => self::option_text('social_facebook'),
                'instagram' => self::option_text('social_instagram'),
                'whatsapp' => self::option_text('social_whatsapp'),
                'youtube' => self::option_text('social_youtube'),
            ],
            'acf' => self::option_fields(),
        ]);
    }

    public static function menus(WP_REST_Request $request): WP_REST_Response
    {
        $lang = self::request_lang($request);
        self::switch_language($lang);

        $menus = [];
        foreach (wp_get_nav_menus() as $menu) {
            $items = wp_get_nav_menu_items($menu->term_id) ?: [];
            $menus[] = [
                'id' => (int) $menu->term_id,
                'slug' => $menu->slug,
                'name' => $menu->name,
                'items' => array_values(array_map([self::class, 'normalize_menu_item'], $items)),
            ];
        }

        return self::response(['lang' => $lang, 'items' => $menus]);
    }

    public static function pages(WP_REST_Request $request): WP_REST_Response
    {
        return self::collection('page', $request);
    }

    public static function page_by_slug(WP_REST_Request $request): WP_REST_Response
    {
        return self::single_by_slug('page', $request);
    }

    public static function services(WP_REST_Request $request): WP_REST_Response
    {
        $lang = self::request_lang($request);
        $items = [];

        foreach (self::SERVICE_SLUGS as $slug) {
            $post = self::service_post_by_canonical_slug($slug, $lang);
            if ($post) {
                $items[] = self::normalize_post($post);
            }
        }

        return self::response(['lang' => $lang, 'items' => $items]);
    }

    public static function service_by_slug(WP_REST_Request $request): WP_REST_Response
    {
        $lang = self::request_lang($request);
        $slug = self::request_slug($request);

        $post = self::find_post_by_slug('page', $slug, $lang);
        if (!$post) {
            $post = self::service_post_by_canonical_slug($slug, $lang);
        }

        if (!$post) {
            return self::not_found($slug);
        }

        return self::response(self::normalize_post($post));
    }

    public static function posts(WP_REST_Request $request): WP_REST_Response
    {
        return self::collection('post', $request, ['posts_per_page' => self::per_page($request)]);
    }

    public static function post_by_slug(WP_REST_Request $request): WP_REST_Response
    {
        return self::single_by_slug('post', $request);
    }

    public static function vacancies(WP_REST_Request $request): WP_REST_Response
    {
        return self::collection('vakansiya', $request, ['posts_per_page' => self::per_page($request)]);
    }

    public static function vacancy_by_slug(WP_REST_Request $request): WP_REST_Response
    {
        return self::single_by_slug('vakansiya', $request);
    }

    public static function employees(WP_REST_Request $request): WP_REST_Response
    {
        return self::collection('emakdaslar', $request, ['posts_per_page' => 100]);
    }

    public static function gallery(WP_REST_Request $request): WP_REST_Response
    {
        $lang = self::request_lang($request);
        self::switch_language($lang);

        return self::response([
            'lang' => $lang,
            'categories' => self::option_value('gallery_categories', []),
            'items' => self::option_value('gallery_items', []),
            'videoUrl' => self::option_text('gallery_video_url') ?: 'https://www.youtube.com/watch?v=BXwEEGgWVO0',
        ]);
    }

    public static function revalidate(WP_REST_Request $request): WP_REST_Response
    {
        return self::response([
            'ok' => true,
            'message' => 'Secret accepted. Configure Next.js /api/revalidate for frontend cache refresh.',
            'path' => sanitize_text_field((string) $request->get_param('path')),
        ]);
    }

    public static function verify_revalidate_secret(WP_REST_Request $request)
    {
        $secret = self::revalidate_secret();
        if ($secret === '') {
            return new WP_Error('one66_revalidate_not_configured', 'Revalidate secret is not configured.', ['status' => 403]);
        }

        $given = (string) $request->get_header('x-revalidate-secret');
        if ($given === '') {
            $given = (string) $request->get_param('secret');
        }

        if (!hash_equals($secret, $given)) {
            return new WP_Error('one66_revalidate_forbidden', 'Invalid revalidate secret.', ['status' => 403]);
        }

        return true;
    }

    public static function cors_headers($served, $result, $request, $server)
    {
        if (!($request instanceof WP_REST_Request)) {
            return $served;
        }

        if (strpos($request->get_route(), '/' . self::NAMESPACE) !== 0) {
            return $served;
        }

        $origin = isset($_SERVER['HTTP_ORIGIN']) ? sanitize_url(wp_unslash($_SERVER['HTTP_ORIGIN'])) : '';
        $allowed = apply_filters('one66_headless_allowed_origins', [
            'https://166temizlik.vercel.app',
            'https://166temizlik.az',
            'https://www.166temizlik.az',
        ]);

        if ($origin && in_array($origin, $allowed, true)) {
            header('Access-Control-Allow-Origin: ' . $origin);
            header('Vary: Origin', false);
        }

        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, X-Revalidate-Secret');

        return $served;
    }

    public static function notify_frontend_revalidate(int $post_id, WP_Post $post): void
    {
        if (wp_is_post_revision($post_id) || wp_is_post_autosave($post_id)) {
            return;
        }

        if (!in_array($post->post_type, ['page', 'post', 'vakansiya', 'emakdaslar'], true)) {
            return;
        }

        $url = defined('ONE66_REVALIDATE_URL') ? (string) constant('ONE66_REVALIDATE_URL') : '';
        $secret = self::revalidate_secret();

        if ($url === '' || $secret === '') {
            return;
        }

        wp_remote_post($url, [
            'timeout' => 3,
            'blocking' => false,
            'headers' => [
                'X-Revalidate-Secret' => $secret,
            ],
            'body' => [
                'id' => $post_id,
                'type' => $post->post_type,
                'slug' => $post->post_name,
            ],
        ]);
    }

    private static function read_route(string $route, string $callback, array $extra_args = []): void
    {
        register_rest_route(self::NAMESPACE, $route, [
            'methods' => WP_REST_Server::READABLE,
            'callback' => [self::class, $callback],
            'permission_callback' => '__return_true',
            'args' => array_merge(self::lang_args(), $extra_args),
        ]);
    }

    private static function collection(string $post_type, WP_REST_Request $request, array $extra_args = []): WP_REST_Response
    {
        $lang = self::request_lang($request);
        self::switch_language($lang);

        $query = new WP_Query(array_merge([
            'post_type' => $post_type,
            'post_status' => 'publish',
            'posts_per_page' => self::per_page($request),
            'paged' => self::page($request),
            'orderby' => 'menu_order date',
            'order' => 'ASC',
            'suppress_filters' => false,
        ], $extra_args));

        return self::response([
            'lang' => $lang,
            'page' => self::page($request),
            'perPage' => self::per_page($request),
            'total' => (int) $query->found_posts,
            'totalPages' => (int) $query->max_num_pages,
            'items' => array_map([self::class, 'normalize_post'], $query->posts),
        ]);
    }

    private static function single_by_slug(string $post_type, WP_REST_Request $request): WP_REST_Response
    {
        $slug = self::request_slug($request);
        $lang = self::request_lang($request);
        $post = self::find_post_by_slug($post_type, $slug, $lang);

        if (!$post) {
            return self::not_found($slug);
        }

        return self::response(self::normalize_post($post));
    }

    private static function find_post_by_slug(string $post_type, string $slug, string $lang): ?WP_Post
    {
        self::switch_language($lang);

        $query = new WP_Query([
            'post_type' => $post_type,
            'post_status' => 'publish',
            'name' => $slug,
            'posts_per_page' => 1,
            'suppress_filters' => false,
        ]);

        return $query->posts[0] ?? null;
    }

    private static function service_post_by_canonical_slug(string $slug, string $lang): ?WP_Post
    {
        $source = self::find_post_by_slug('page', $slug, 'az');
        if (!$source) {
            return null;
        }

        $translated_id = self::translated_object_id($source->ID, 'page', $lang);
        if (!$translated_id) {
            return $source;
        }

        $post = get_post($translated_id);
        return $post instanceof WP_Post && $post->post_status === 'publish' ? $post : $source;
    }

    private static function normalize_post(WP_Post $post): array
    {
        $featured_id = get_post_thumbnail_id($post);

        return [
            'id' => (int) $post->ID,
            'type' => $post->post_type,
            'slug' => $post->post_name,
            'language' => self::post_language($post->ID),
            'translations' => self::translations($post),
            'title' => html_entity_decode(get_the_title($post), ENT_QUOTES, 'UTF-8'),
            'excerpt' => self::clean_text(get_the_excerpt($post)),
            'content' => apply_filters('the_content', $post->post_content),
            'featuredImage' => $featured_id ? self::media($featured_id) : null,
            'acf' => self::acf_fields($post->ID),
            'seo' => self::seo($post->ID),
            'link' => get_permalink($post),
            'date' => get_post_time('c', true, $post),
            'modified' => get_post_modified_time('c', true, $post),
        ];
    }

    private static function normalize_menu_item(WP_Post $item): array
    {
        return [
            'id' => (int) $item->ID,
            'parentId' => (int) $item->menu_item_parent,
            'title' => html_entity_decode($item->title, ENT_QUOTES, 'UTF-8'),
            'url' => $item->url,
            'target' => $item->target,
            'classes' => array_values(array_filter((array) $item->classes)),
            'object' => $item->object,
            'objectId' => (int) $item->object_id,
        ];
    }

    private static function media(int $attachment_id): ?array
    {
        $url = wp_get_attachment_url($attachment_id);
        if (!$url) {
            return null;
        }

        $meta = wp_get_attachment_metadata($attachment_id);

        return [
            'id' => $attachment_id,
            'url' => $url,
            'alt' => get_post_meta($attachment_id, '_wp_attachment_image_alt', true),
            'width' => $meta['width'] ?? null,
            'height' => $meta['height'] ?? null,
            'sizes' => $meta['sizes'] ?? [],
        ];
    }

    private static function acf_fields(int $post_id): array
    {
        if (!function_exists('get_fields')) {
            return [];
        }

        $fields = get_fields($post_id);
        return is_array($fields) ? self::normalize_acf_value($fields) : [];
    }

    private static function option_fields(): array
    {
        if (!function_exists('get_fields')) {
            return [];
        }

        $fields = get_fields('option');
        return is_array($fields) ? self::normalize_acf_value($fields) : [];
    }

    private static function option_value(string $field, $fallback)
    {
        if (!function_exists('get_field')) {
            return $fallback;
        }

        $value = get_field($field, 'option');
        if ($value === null || $value === false || $value === '') {
            return $fallback;
        }

        return self::normalize_acf_value($value);
    }

    private static function normalize_acf_value($value)
    {
        if ($value instanceof WP_Post) {
            return [
                'id' => (int) $value->ID,
                'slug' => $value->post_name,
                'title' => html_entity_decode(get_the_title($value), ENT_QUOTES, 'UTF-8'),
                'type' => $value->post_type,
            ];
        }

        if (is_array($value)) {
            if (isset($value['ID'], $value['url'])) {
                return [
                    'id' => (int) $value['ID'],
                    'url' => $value['url'],
                    'alt' => $value['alt'] ?? '',
                    'width' => $value['width'] ?? null,
                    'height' => $value['height'] ?? null,
                    'sizes' => $value['sizes'] ?? [],
                ];
            }

            return array_map([self::class, 'normalize_acf_value'], $value);
        }

        return $value;
    }

    private static function seo(int $post_id): array
    {
        $title = get_post_meta($post_id, '_yoast_wpseo_title', true);
        $description = get_post_meta($post_id, '_yoast_wpseo_metadesc', true);
        $canonical = get_post_meta($post_id, '_yoast_wpseo_canonical', true);

        return [
            'title' => $title ?: null,
            'description' => $description ?: null,
            'canonical' => $canonical ?: null,
        ];
    }

    private static function translations(WP_Post $post): array
    {
        if (!has_filter('wpml_element_trid') || !has_filter('wpml_get_element_translations')) {
            return [];
        }

        $element_type = 'post_' . $post->post_type;
        $trid = apply_filters('wpml_element_trid', null, $post->ID, $element_type);
        $translations = $trid ? apply_filters('wpml_get_element_translations', null, $trid, $element_type) : null;

        if (!is_array($translations)) {
            return [];
        }

        $items = [];
        foreach ($translations as $lang => $translation) {
            $translated_post = get_post((int) $translation->element_id);
            if (!$translated_post instanceof WP_Post || $translated_post->post_status !== 'publish') {
                continue;
            }

            $items[$lang] = [
                'id' => (int) $translated_post->ID,
                'slug' => $translated_post->post_name,
                'link' => get_permalink($translated_post),
            ];
        }

        return $items;
    }

    private static function post_language(int $post_id): ?string
    {
        if (!has_filter('wpml_post_language_details')) {
            return null;
        }

        $details = apply_filters('wpml_post_language_details', null, $post_id);
        return is_array($details) && isset($details['language_code']) ? $details['language_code'] : null;
    }

    private static function translated_object_id(int $post_id, string $post_type, string $lang): ?int
    {
        if (!has_filter('wpml_object_id')) {
            return $post_id;
        }

        $translated = apply_filters('wpml_object_id', $post_id, $post_type, false, $lang);
        return $translated ? (int) $translated : null;
    }

    private static function switch_language(string $lang): void
    {
        if (has_action('wpml_switch_language')) {
            do_action('wpml_switch_language', $lang);
        }
    }

    private static function option_text(string $field): ?string
    {
        if (function_exists('get_field')) {
            $value = get_field($field, 'option');
            if (is_string($value) && $value !== '') {
                return $value;
            }
        }

        $value = get_option($field);
        return is_string($value) && $value !== '' ? $value : null;
    }

    private static function option_image(string $field): ?array
    {
        if (!function_exists('get_field')) {
            return null;
        }

        $value = get_field($field, 'option');
        return is_array($value) ? self::normalize_acf_value($value) : null;
    }

    private static function clean_text(string $value): string
    {
        return trim(html_entity_decode(wp_strip_all_tags($value), ENT_QUOTES, 'UTF-8'));
    }

    private static function response($data, int $status = 200): WP_REST_Response
    {
        $response = new WP_REST_Response($data, $status);
        $response->header('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');

        return $response;
    }

    private static function not_found(string $slug): WP_REST_Response
    {
        return self::response([
            'message' => 'Content not found.',
            'slug' => $slug,
        ], 404);
    }

    private static function request_lang(WP_REST_Request $request): string
    {
        $lang = sanitize_key((string) $request->get_param('lang'));
        return in_array($lang, self::LANGUAGES, true) ? $lang : 'az';
    }

    private static function request_slug(WP_REST_Request $request): string
    {
        return sanitize_title((string) rawurldecode($request->get_param('slug')));
    }

    private static function page(WP_REST_Request $request): int
    {
        return max(1, (int) $request->get_param('page'));
    }

    private static function per_page(WP_REST_Request $request): int
    {
        $per_page = (int) $request->get_param('per_page');
        return max(1, min(100, $per_page ?: 20));
    }

    private static function revalidate_secret(): string
    {
        if (defined('ONE66_REVALIDATE_SECRET')) {
            return (string) constant('ONE66_REVALIDATE_SECRET');
        }

        $env = getenv('ONE66_REVALIDATE_SECRET');
        return is_string($env) ? $env : '';
    }

    private static function lang_args(): array
    {
        return [
            'lang' => [
                'description' => 'Language code.',
                'type' => 'string',
                'enum' => self::LANGUAGES,
                'default' => 'az',
            ],
        ];
    }

    private static function slug_args(): array
    {
        return [
            'slug' => [
                'description' => 'Content slug.',
                'type' => 'string',
                'required' => true,
            ],
        ];
    }

    private static function pagination_args(): array
    {
        return [
            'page' => [
                'type' => 'integer',
                'default' => 1,
                'minimum' => 1,
            ],
            'per_page' => [
                'type' => 'integer',
                'default' => 20,
                'minimum' => 1,
                'maximum' => 100,
            ],
        ];
    }
}

One66_Headless_API::boot();
