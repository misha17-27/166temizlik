<?php
/**
 * Plugin Name: 166 Headless API
 * Description: Headless REST endpoints for the 166 Temizlik Next.js frontend.
 * Version: 0.4.11
 * Author: 166 Temizlik
 */

if (!defined('ABSPATH')) {
    exit;
}

final class One66_Headless_API
{
    private const VERSION = '0.4.11';

    private const NAMESPACE = 'headless/v1';

    private const LANGUAGES = ['az', 'ru', 'tr'];

    private const STATIC_PAGE_SLUGS = [
        'home' => ['home', 'ana-sehife', 'ana-sehife-2', '166-temizlik'],
        'gallery' => ['qalereya'],
        'partners' => ['partnyorlar'],
        'about' => ['sirket-haqqinda'],
        'equipment' => ['temizlik-xidmeti'],
        'contact' => ['166-temizlik-elaqe'],
    ];

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

    private const ELEMENTOR_LOCKED_POST_TYPES = [
        'page',
        'post',
        'vakansiya',
        'emakdaslar',
        'partners',
        'partner',
        'partnyorlar',
        'slayd',
    ];

    private const FRONTEND_STATIC_PATHS = [
        'az' => [
            'ana-sehife' => '/',
            'ana-sehife-2' => '/',
            '166-temizlik' => '/',
            'temizlik-xidmetleri' => '/temizlik-xidmetleri',
            'sirket-haqqinda' => '/sirket-haqqinda',
            'qalereya' => '/qalereya',
            '166-temizlik-elaqe' => '/166-temizlik-elaqe',
            'bloq' => '/bloq',
            'temizlik-xidmeti' => '/temizlik-xidmeti',
            'partnyorlar' => '/partnyorlar',
            'emekdaslarimiz' => '/emekdaslarimiz',
            'vakansiya' => '/vakansiya',
        ],
        'ru' => [
            'glavnaya2' => '/ru/',
            'ana-sehife' => '/ru/',
            'temizlik-xidmetleri' => '/ru/uslugi-po-uborke',
            'uslugi-po-uborke' => '/ru/uslugi-po-uborke',
            'sirket-haqqinda' => '/ru/o-kompanii',
            'o-kompanii' => '/ru/o-kompanii',
            'qalereya' => '/ru/galereya',
            'galereya' => '/ru/galereya',
            '166-temizlik-elaqe' => '/ru/166-kontaktnyj-nomer',
            '166-kontaktnyj-nomer' => '/ru/166-kontaktnyj-nomer',
            'bloq' => '/ru/bloq',
            'temizlik-xidmeti' => '/ru/oborudovanie-i-materialy',
            'oborudovanie-i-materialy' => '/ru/oborudovanie-i-materialy',
            'partnyorlar' => '/ru/partnyory',
            'partnyory' => '/ru/partnyory',
            'emekdaslarimiz' => '/ru/nashikollegi',
            'nashikollegi' => '/ru/nashikollegi',
            'vakansiya' => '/ru/vakansiya',
        ],
        'tr' => [
            'ana-sehife' => '/tr/',
            'temizlik-xidmetleri' => '/tr/temizlik-xidmetleri',
            'sirket-haqqinda' => '/tr/sirket-haqqinda',
            'qalereya' => '/tr/qalereya',
            '166-temizlik-elaqe' => '/tr/166-temizlik-elaqe',
            'bloq' => '/tr/bloq',
            'temizlik-xidmeti' => '/tr/temizlik-xidmeti',
            'partnyorlar' => '/tr/partnyorlar',
            'emekdaslarimiz' => '/tr/emekdaslarimiz',
            'vakansiya' => '/tr/vakansiya',
        ],
    ];

    private const SERVICE_FRONTEND_SLUGS = [
        'ev-temizliyi-xidmeti' => ['az' => 'ev-temizliyi-xidmeti', 'ru' => 'uborka-doma', 'tr' => 'ev-temizliyi-xidmeti'],
        'ofis-temizliyi' => ['az' => 'ofis-temizliyi', 'ru' => 'uborka-ofisa', 'tr' => 'ofis-temizliyi'],
        'bag-evlerinin-temizliyi' => ['az' => 'bag-evlerinin-temizliyi', 'ru' => 'uborka-zagorodnogo-doma', 'tr' => 'bag-evlerinin-temizliyi'],
        'erazi-temizliyi' => ['az' => 'erazi-temizliyi', 'ru' => 'uborka-territorii', 'tr' => 'erazi-temizliyi'],
        'fasad-temizliyi' => ['az' => 'fasad-temizliyi', 'ru' => 'ochistka-fasada', 'tr' => 'fasad-temizliyi'],
        'pencere-temizliyi' => ['az' => 'pencere-temizliyi', 'ru' => 'mojka-okon', 'tr' => 'pencere-temizliyi'],
        'cilciraq-temizliyi' => ['az' => 'cilciraq-temizliyi', 'ru' => 'chistka-lyustry', 'tr' => 'cilciraq-temizliyi'],
        'perde-yuma' => ['az' => 'perde-yuma', 'ru' => 'stirka-shtor-i-zhalyuzi', 'tr' => 'perde-yuma'],
        'yumsaq-mebel-temizlenmesi' => ['az' => 'yumsaq-mebel-temizlenmesi', 'ru' => 'chistka-obivki', 'tr' => 'yumsaq-mebel-temizlenmesi'],
        'etirlendirme' => ['az' => 'etirlendirme', 'ru' => 'aromatizatsiya-pomeshheniya', 'tr' => 'etirlendirme'],
        'baximsiz-ev-temizliyi' => ['az' => 'baximsiz-ev-temizliyi', 'ru' => 'uborka-chistyj-dom', 'tr' => 'baximsiz-ev-temizliyi'],
        'yangindan-sonra-ev-temizliyi' => ['az' => 'yangindan-sonra-ev-temizliyi', 'ru' => 'uborka-doma-posle-pozhara', 'tr' => 'yangindan-sonra-ev-temizliyi'],
        'temir-sonrasi-temizlik' => ['az' => 'temir-sonrasi-temizlik', 'ru' => 'uborka-doma-posle-remonta', 'tr' => 'temir-sonrasi-temizlik'],
        'otel-temizlenmesi' => ['az' => 'otel-temizlenmesi', 'ru' => 'uborka-otelya', 'tr' => 'otel-temizlenmesi'],
        'restoran-temizlenmesi' => ['az' => 'restoran-temizlenmesi', 'ru' => 'uborka-restorana', 'tr' => 'restoran-temizlenmesi'],
        'kristallasdirma-xidmeti' => ['az' => 'kristallasdirma-xidmeti', 'ru' => 'sluzhba-kristallizatsii', 'tr' => 'kristallasdirma-xidmeti'],
        'hovuz-temizlenmesi-xidmeti' => ['az' => 'hovuz-temizlenmesi-xidmeti', 'ru' => 'uslugi-po-chistke-bassejna', 'tr' => 'hovuz-temizlenmesi-xidmeti'],
        'korporativ-temizlik-xidmeti' => ['az' => 'korporativ-temizlik-xidmeti', 'ru' => 'korporativ-temizlik-xidmeti', 'tr' => 'korporativ-temizlik-xidmeti'],
    ];

    public static function boot(): void
    {
        add_action('rest_api_init', [self::class, 'register_routes']);
        add_filter('rest_pre_serve_request', [self::class, 'cors_headers'], 10, 4);
        add_action('save_post', [self::class, 'notify_frontend_revalidate'], 20, 2);
        add_action('added_option', [self::class, 'notify_frontend_settings_revalidate_on_option_update'], 20, 2);
        add_action('updated_option', [self::class, 'notify_frontend_settings_revalidate_on_option_update'], 20, 3);
        add_action('deleted_option', [self::class, 'notify_frontend_settings_revalidate_on_option_update'], 20, 1);
        add_action('admin_init', [self::class, 'block_elementor_editor']);
        add_action('template_redirect', [self::class, 'block_elementor_preview']);
        add_filter('page_row_actions', [self::class, 'remove_elementor_row_actions'], 20, 2);
        add_filter('post_row_actions', [self::class, 'remove_elementor_row_actions'], 20, 2);
        add_action('admin_head', [self::class, 'hide_elementor_admin_controls']);
        add_action('admin_bar_menu', [self::class, 'remove_elementor_admin_bar_controls'], 999);
    }

    public static function block_elementor_editor(): void
    {
        if (self::elementor_editing_allowed()) {
            return;
        }

        $action = isset($_GET['action']) ? sanitize_key(wp_unslash($_GET['action'])) : '';
        $post_id = isset($_GET['post']) ? absint($_GET['post']) : 0;

        if ($action === 'elementor' && $post_id && self::is_elementor_locked_post($post_id)) {
            self::elementor_blocked_message();
        }

        $preview_id = isset($_GET['elementor-preview']) ? absint($_GET['elementor-preview']) : 0;
        if ($preview_id && self::is_elementor_locked_post($preview_id)) {
            self::elementor_blocked_message();
        }
    }

    public static function block_elementor_preview(): void
    {
        if (self::elementor_editing_allowed()) {
            return;
        }

        $preview_id = isset($_GET['elementor-preview']) ? absint($_GET['elementor-preview']) : 0;
        if ($preview_id && self::is_elementor_locked_post($preview_id)) {
            self::elementor_blocked_message();
        }
    }

    public static function remove_elementor_row_actions(array $actions, WP_Post $post): array
    {
        if (self::elementor_editing_allowed() || !self::is_elementor_locked_post((int) $post->ID)) {
            return $actions;
        }

        foreach (array_keys($actions) as $key) {
            if (stripos((string) $key, 'elementor') !== false || stripos((string) $actions[$key], 'elementor') !== false) {
                unset($actions[$key]);
            }
        }

        return $actions;
    }

    public static function hide_elementor_admin_controls(): void
    {
        if (self::elementor_editing_allowed()) {
            return;
        }
        ?>
        <style>
            #elementor-switch-mode,
            #elementor-editor,
            .elementor-switch-mode,
            .elementor-button.elementor-switch-mode-button,
            .edit-with-elementor,
            a[href*="action=elementor"],
            a[href*="elementor-preview"] {
                display: none !important;
            }
        </style>
        <?php
    }

    public static function remove_elementor_admin_bar_controls(WP_Admin_Bar $wp_admin_bar): void
    {
        if (self::elementor_editing_allowed()) {
            return;
        }

        foreach (['elementor_edit_page', 'elementor_app_site_editor', 'elementor_inspector'] as $node_id) {
            $wp_admin_bar->remove_node($node_id);
        }
    }

    private static function elementor_editing_allowed(): bool
    {
        return defined('ONE66_ALLOW_ELEMENTOR_EDITING') && (bool) ONE66_ALLOW_ELEMENTOR_EDITING;
    }

    private static function is_elementor_locked_post(int $post_id): bool
    {
        $post_type = get_post_type($post_id);
        return is_string($post_type) && in_array($post_type, self::ELEMENTOR_LOCKED_POST_TYPES, true);
    }

    private static function elementor_blocked_message(): void
    {
        wp_die(
            esc_html__('Elementor editing is disabled for this headless frontend. Edit content through WordPress fields, Pods, ACF, Yoast, or the standard editor instead.', 'one66-headless-api'),
            esc_html__('Elementor editing disabled', 'one66-headless-api'),
            ['response' => 403]
        );
    }

    public static function register_routes(): void
    {
        self::read_route('/settings', 'settings');
        self::read_route('/home', 'home');
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
        self::read_route('/partners', 'partners');
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
        $contact = array_merge(self::contact_page_fields($lang), array_filter([
            'phonePrimary' => self::option_text('phone_primary'),
            'phoneSecondary' => self::option_text('phone_secondary'),
            'email' => self::option_text('email'),
            'address' => self::option_text('address'),
            'locationUrl' => self::option_text('location_url'),
            'facebook' => self::option_text('social_facebook'),
            'instagram' => self::option_text('social_instagram'),
            'whatsapp' => self::option_text('social_whatsapp'),
            'youtube' => self::option_text('social_youtube'),
        ], [self::class, 'has_value']));
        $logo = self::option_image('site_logo') ?: self::custom_logo();
        $logo_dark = self::option_image('site_logo_dark') ?: $logo;
        $favicon = self::option_image('favicon') ?: self::site_icon();

        return self::response([
            'lang' => $lang,
            'pluginVersion' => self::VERSION,
            'siteName' => get_bloginfo('name'),
            'description' => get_bloginfo('description'),
            'homeUrl' => home_url('/'),
            'logo' => $logo,
            'logoDark' => $logo_dark,
            'favicon' => $favicon,
            'phonePrimary' => $contact['phonePrimary'] ?? null,
            'phoneSecondary' => $contact['phoneSecondary'] ?? null,
            'email' => $contact['email'] ?? null,
            'address' => $contact['address'] ?? null,
            'locationUrl' => $contact['locationUrl'] ?? null,
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
                'facebook' => $contact['facebook'] ?? null,
                'instagram' => $contact['instagram'] ?? null,
                'whatsapp' => $contact['whatsapp'] ?? null,
                'youtube' => $contact['youtube'] ?? null,
            ],
            'contact' => $contact,
            'assets' => [
                'logo' => $logo,
                'logoDark' => $logo_dark,
                'favicon' => $favicon,
            ],
            'staticPages' => self::static_pages($lang),
            'acf' => self::option_fields(),
        ]);
    }

    public static function home(WP_REST_Request $request): WP_REST_Response
    {
        $lang = self::request_lang($request);
        self::switch_language($lang);

        $page = self::static_page_post('home', $lang);
        $normalized = $page ? self::normalize_static_page($page, 'home') : null;
        $mapped = $normalized['mappedAcf'] ?? [];
        $pods_slides = self::home_slides($lang);
        if ($pods_slides) {
            $mapped['heroSlides'] = $pods_slides;
        }
        if (empty($mapped['services'])) {
            $mapped['services'] = self::home_services($lang);
        }
        $content_images = self::home_content_images($normalized['content'] ?? '');
        foreach ($mapped['services'] as $index => &$service) {
            if (!empty($content_images[$index])) {
                $service['icon'] = ['url' => $content_images[$index]];
            }
        }
        unset($service);

        $section_images = array_slice($content_images, -8);
        if (!empty($section_images[0])) {
            $mapped['about'] = is_array($mapped['about'] ?? null) ? $mapped['about'] : [];
            $mapped['about']['image'] = ['url' => $section_images[0]];
        }
        if (!empty($section_images[1])) {
            $mapped['mapImage'] = ['url' => $section_images[1]];
        }

        return self::response([
            'lang' => $lang,
            'page' => $normalized,
            'acf' => $normalized['acf'] ?? [],
            'mappedAcf' => $mapped,
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

        return self::response(['lang' => $lang, 'items' => self::service_items($lang)]);
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

    public static function partners(WP_REST_Request $request): WP_REST_Response
    {
        $lang = self::request_lang($request);
        self::switch_language($lang);

        $items = self::partners_from_options();
        if (!$items) {
            $items = self::partners_from_page($lang);
        }
        if (!$items) {
            $items = self::partners_from_posts();
        }
        $page = self::static_page_post('partners', $lang);
        $normalized = $page ? self::normalize_static_page($page, 'partners') : null;

        return self::response([
            'lang' => $lang,
            'page' => $normalized,
            'items' => array_values($items),
        ]);
    }

    public static function gallery(WP_REST_Request $request): WP_REST_Response
    {
        $lang = self::request_lang($request);
        self::switch_language($lang);
        $page = self::static_page_post('gallery', $lang);
        $normalized = $page ? self::normalize_static_page($page, 'gallery') : null;
        $mapped = $normalized['mappedAcf'] ?? [];

        return self::response([
            'lang' => $lang,
            'page' => $normalized,
            'acf' => $normalized['acf'] ?? [],
            'mappedAcf' => $mapped,
            'categories' => self::first_non_empty([self::option_value('gallery_categories', []), $mapped['categories'] ?? []], []),
            'categoryLabels' => self::first_non_empty([self::option_value('gallery_category_labels', []), $mapped['categoryLabels'] ?? []], []),
            'items' => self::first_non_empty([self::option_value('gallery_items', []), $mapped['items'] ?? []], []),
            'videoUrl' => self::first_non_empty([self::option_text('gallery_video_url'), $mapped['videoUrl'] ?? null], 'https://www.youtube.com/watch?v=BXwEEGgWVO0'),
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

        if (!in_array($post->post_type, ['page', 'post', 'vakansiya', 'emakdaslar', 'partners', 'partner', 'partnyorlar', 'slayd'], true)) {
            return;
        }

        self::send_frontend_revalidate([
            'id' => $post_id,
            'type' => $post->post_type,
            'slug' => $post->post_name,
            'lang' => self::post_language($post_id) ?: 'az',
            'tags' => self::revalidate_tags($post),
            'paths' => self::revalidate_paths($post),
        ]);
    }

    public static function notify_frontend_settings_revalidate_on_option_update(string $option, $old_value = null, $value = null): void
    {
        if (!self::is_settings_option($option)) {
            return;
        }

        self::send_frontend_revalidate([
            'type' => 'settings',
            'slug' => 'settings',
            'tags' => ['wordpress:settings'],
            'paths' => ['/', '/ru', '/tr'],
        ]);
    }

    private static function is_settings_option(string $option): bool
    {
        if (strpos($option, 'theme_mods_') === 0) {
            return true;
        }

        $settings_options = [
            'blogname',
            'blogdescription',
            'site_icon',
            'site_logo',
            'site_logo_dark',
            'favicon',
            'phone_primary',
            'phone_secondary',
            'email',
            'address',
            'location_url',
            'social_facebook',
            'social_instagram',
            'social_whatsapp',
            'social_youtube',
            'footer_cta_title',
            'footer_cta_primary_label',
            'footer_cta_primary_url',
            'footer_cta_secondary_label',
            'footer_cta_secondary_url',
            'order_popup_title',
            'options_site_logo',
            'options_site_logo_dark',
            'options_favicon',
            'options_phone_primary',
            'options_phone_secondary',
            'options_email',
            'options_address',
            'options_location_url',
            'options_social_facebook',
            'options_social_instagram',
            'options_social_whatsapp',
            'options_social_youtube',
            'options_footer_cta_title',
            'options_footer_cta_primary_label',
            'options_footer_cta_primary_url',
            'options_footer_cta_secondary_label',
            'options_footer_cta_secondary_url',
            'options_order_popup_title',
        ];

        return in_array($option, $settings_options, true);
    }

    private static function send_frontend_revalidate(array $payload): void
    {
        $urls = self::revalidate_urls();
        $secret = self::revalidate_secret();

        if ($urls === [] || $secret === '') {
            return;
        }

        foreach ($urls as $url) {
            wp_remote_post($url, [
                'timeout' => 3,
                'blocking' => false,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'X-Revalidate-Secret' => $secret,
                ],
                'body' => wp_json_encode($payload),
            ]);
        }
    }

    private static function revalidate_tags(WP_Post $post): array
    {
        $slug = $post->post_name;
        $service_slug = self::canonical_service_slug($slug);

        if ($post->post_type === 'post') {
            return ['wordpress:posts', 'wordpress:post:' . $slug];
        }

        if ($post->post_type === 'vakansiya') {
            return ['wordpress:vacancies', 'wordpress:vacancy:' . $slug];
        }

        if ($post->post_type === 'emakdaslar') {
            return ['wordpress:employees', 'wordpress:employee:' . $slug];
        }

        if (in_array($post->post_type, ['partners', 'partner', 'partnyorlar'], true)) {
            return ['wordpress:partners', 'wordpress:partner:' . $slug];
        }

        if ($post->post_type === 'slayd') {
            return ['wordpress:home', 'wordpress:page:home'];
        }

        if ($post->post_type === 'page' && $service_slug) {
            return array_values(array_unique([
                'wordpress:pages',
                'wordpress:page:' . $slug,
                'wordpress:services',
                'wordpress:service:' . $service_slug,
            ]));
        }

        if ($post->post_type === 'page' && self::is_home_page($post)) {
            return ['wordpress:pages', 'wordpress:page:' . $slug, 'wordpress:home', 'wordpress:page:home'];
        }

        return ['wordpress:pages', 'wordpress:page:' . $slug];
    }

    private static function revalidate_paths(WP_Post $post): array
    {
        $slug = $post->post_name;
        $lang = self::post_language($post->ID) ?: 'az';
        $service_slug = self::canonical_service_slug($slug);

        if ($post->post_type === 'post') {
            return [
                self::frontend_static_path('bloq', $lang),
                self::frontend_blog_path($slug, $lang),
            ];
        }

        if ($post->post_type === 'vakansiya') {
            return [
                self::frontend_static_path('vakansiya', $lang),
                self::frontend_path('vakansiya/' . $slug, $lang),
            ];
        }

        if ($post->post_type === 'emakdaslar') {
            return [self::frontend_static_path('emekdaslarimiz', $lang)];
        }

        if (in_array($post->post_type, ['partners', 'partner', 'partnyorlar'], true)) {
            return [self::frontend_static_path('partnyorlar', $lang)];
        }

        if ($post->post_type === 'slayd') {
            return ['/', '/ru', '/tr'];
        }

        if ($post->post_type === 'page' && $service_slug) {
            return [
                self::frontend_static_path('temizlik-xidmetleri', $lang),
                self::frontend_service_path($service_slug, $lang),
            ];
        }

        if ($post->post_type === 'page' && self::is_home_page($post)) {
            return ['/', '/ru', '/tr'];
        }

        if ($post->post_type === 'page') {
            return [self::frontend_static_path($slug, $lang) ?: self::frontend_path($slug, $lang)];
        }

        return [];
    }

    private static function canonical_service_slug(string $slug): ?string
    {
        foreach (self::SERVICE_FRONTEND_SLUGS as $canonical_slug => $localized_slugs) {
            if ($slug === $canonical_slug || in_array($slug, $localized_slugs, true)) {
                return $canonical_slug;
            }
        }

        return null;
    }

    private static function frontend_static_path(string $slug, string $lang): string
    {
        return self::FRONTEND_STATIC_PATHS[$lang][$slug] ?? self::frontend_path($slug, $lang);
    }

    private static function frontend_service_path(string $canonical_slug, string $lang): string
    {
        $localized_slug = self::SERVICE_FRONTEND_SLUGS[$canonical_slug][$lang] ?? $canonical_slug;
        return self::frontend_path($localized_slug, $lang);
    }

    private static function frontend_blog_path(string $slug, string $lang): string
    {
        $blog_path = self::frontend_static_path('bloq', $lang);
        return rtrim($blog_path, '/') . '/' . trim($slug, '/');
    }

    private static function frontend_path(string $path, string $lang): string
    {
        $normalized = trim($path, '/');

        if ($normalized === '') {
            return $lang === 'az' ? '/' : '/' . $lang;
        }

        return ($lang === 'az' ? '' : '/' . $lang) . '/' . $normalized;
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

    private static function service_items(string $lang): array
    {
        $items = [];

        foreach (self::SERVICE_SLUGS as $slug) {
            $post = self::service_post_by_canonical_slug($slug, $lang);
            if ($post) {
                $items[] = self::normalize_post($post);
            }
        }

        return $items;
    }

    private static function home_services(string $lang): array
    {
        return array_values(array_filter(array_map(function (array $item): ?array {
            $acf = is_array($item['acf'] ?? null) ? $item['acf'] : [];
            $icon = self::acf_image(self::acf_first($acf, ['icon', 'service_icon', 'ikon', 'xidmet_iconu']));
            if (!$icon && !empty($item['featuredImage'])) {
                $icon = $item['featuredImage'];
            }

            if (!$icon) {
                return null;
            }

            return [
                'title' => $item['title'] ?? '',
                'slug' => $item['slug'] ?? '',
                'icon' => $icon,
            ];
        }, self::service_items($lang))));
    }

    private static function home_slides(string $lang): array
    {
        $slides = self::home_slides_for_language($lang);
        if (count($slides) < 2 && $lang !== 'az') {
            $slides = self::home_slides_for_language('az');
            self::switch_language($lang);
        }

        return count($slides) >= 2 ? array_slice($slides, 0, 4) : [];
    }

    private static function home_slides_for_language(string $lang): array
    {
        self::switch_language($lang);

        $query = new WP_Query([
            'post_type' => 'slayd',
            'post_status' => 'publish',
            'posts_per_page' => 20,
            'orderby' => 'date',
            'order' => 'ASC',
            'suppress_filters' => false,
        ]);
        $slides = [];

        foreach ($query->posts as $post) {
            $desktop = self::media((int) get_post_thumbnail_id($post));
            if (!$desktop) {
                continue;
            }

            $mobile = self::acf_image(get_post_meta($post->ID, 'mobile_slide', true)) ?: $desktop;
            $sort_order = (int) get_post_meta($post->ID, 'sort_order', true);
            $slides[] = [
                'id' => (int) $post->ID,
                'title' => html_entity_decode(get_the_title($post), ENT_QUOTES, 'UTF-8'),
                'desktopImage' => $desktop,
                'mobileImage' => $mobile,
                'sortOrder' => $sort_order > 0 ? $sort_order : PHP_INT_MAX,
            ];
        }

        usort($slides, static function (array $left, array $right): int {
            return [$left['sortOrder'], $left['id']] <=> [$right['sortOrder'], $right['id']];
        });

        return $slides;
    }

    private static function home_content_images(string $content): array
    {
        if (!preg_match_all('/<img\b[^>]*\bsrc=["\']([^"\']+)["\']/i', $content, $matches)) {
            return [];
        }

        return array_values(array_filter(array_map([self::class, 'normalize_content_image_url'], $matches[1])));
    }

    private static function home_content_before_after(string $content): array
    {
        if ($content === '') {
            return [];
        }

        $before_urls = self::image_urls_by_class($content, 'jet-image-comparison__before-image');
        $after_urls = self::image_urls_by_class($content, 'jet-image-comparison__after-image');
        if (!$before_urls || !$after_urls) {
            return self::legacy_home_content_before_after($content);
        }

        $count = min(count($before_urls), count($after_urls));
        $items = [];

        for ($index = 0; $index < $count; $index++) {
            $before = self::acf_image($before_urls[$index]);
            $after = self::acf_image($after_urls[$index]);
            if (!$before || !$after) {
                continue;
            }

            $items[] = [
                'title' => (string) ($index + 1),
                'before' => $before,
                'after' => $after,
            ];
        }

        return $items;
    }

    private static function legacy_home_content_before_after(string $content): array
    {
        $urls = array_values(array_filter(self::home_content_images($content), static function (string $url): bool {
            return (bool) preg_match('/\/(?:as12|as11|b11|b22|q11|q22)\.webp(?:\?.*)?$/i', $url);
        }));

        $items = [];
        for ($index = 0; $index + 1 < count($urls); $index += 2) {
            $before = self::acf_image($urls[$index]);
            $after = self::acf_image($urls[$index + 1]);
            if (!$before || !$after) {
                continue;
            }

            $items[] = [
                'title' => (string) (count($items) + 1),
                'before' => $before,
                'after' => $after,
            ];
        }

        return $items;
    }

    private static function image_urls_by_class(string $content, string $class): array
    {
        if (!preg_match_all('/<img\b[^>]*>/i', $content, $matches)) {
            return [];
        }

        $urls = [];
        foreach ($matches[0] as $tag) {
            if (!preg_match('/\bclass=["\']([^"\']*)["\']/i', $tag, $class_match)) {
                continue;
            }

            $classes = preg_split('/\s+/', $class_match[1]);
            if (!in_array($class, $classes, true)) {
                continue;
            }

            if (preg_match('/\bsrc=["\']([^"\']+)["\']/i', $tag, $src_match)) {
                $urls[] = self::normalize_content_image_url($src_match[1]);
            }
        }

        return array_values(array_filter($urls));
    }

    private static function normalize_content_image_url(string $url): string
    {
        if (str_contains($url, '/revslider-2/public/assets/assets/dummy.png')) {
            return '';
        }

        return str_starts_with($url, '//') ? 'https:' . $url : $url;
    }

    private static function merge_before_after_items(array $primary, array $secondary): array
    {
        $items = [];
        $seen = [];

        foreach (array_merge($primary, $secondary) as $item) {
            $before_url = (string) ($item['before']['url'] ?? '');
            $after_url = (string) ($item['after']['url'] ?? '');
            if ($before_url === '' || $after_url === '') {
                continue;
            }

            $key = $before_url . '|' . $after_url;
            if (isset($seen[$key])) {
                continue;
            }

            $seen[$key] = true;
            $item['title'] = (string) (count($items) + 1);
            $items[] = $item;
        }

        return $items;
    }

    private static function is_home_page(WP_Post $post): bool
    {
        $front_id = (int) get_option('page_on_front');
        if ($front_id > 0 && (int) $post->ID === $front_id) {
            return true;
        }

        return in_array($post->post_name, self::STATIC_PAGE_SLUGS['home'], true);
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

    private static function static_pages(string $lang): array
    {
        $items = [];
        foreach (array_keys(self::STATIC_PAGE_SLUGS) as $key) {
            $post = self::static_page_post($key, $lang);
            if (!$post) {
                $items[$key] = null;
                continue;
            }

            $acf = self::acf_fields($post->ID);
            $items[$key] = [
                'id' => (int) $post->ID,
                'slug' => $post->post_name,
                'title' => html_entity_decode(get_the_title($post), ENT_QUOTES, 'UTF-8'),
                'link' => get_permalink($post),
                'acf' => $acf,
                'mappedAcf' => self::map_static_page_fields($key, $acf, apply_filters('the_content', $post->post_content)),
                'seo' => self::seo($post->ID),
            ];
        }

        return $items;
    }

    private static function contact_page_fields(string $lang): array
    {
        $post = self::static_page_post('contact', $lang);
        $fields = $post ? self::acf_fields($post->ID) : [];
        $content = $post ? apply_filters('the_content', $post->post_content) : '';

        return [
            'phonePrimary' => self::acf_text(self::acf_first($fields, ['telefon', 'phone', 'phone_primary'])),
            'phoneSecondary' => self::acf_text(self::acf_first($fields, ['mobil_telefon', 'mobile_phone', 'phone_secondary'])),
            'email' => self::acf_text(self::acf_first($fields, ['email', 'mail'])),
            'address' => self::acf_text(self::acf_first($fields, ['unvan', 'address'])),
            'locationUrl' => self::first_map_url($content),
            'facebook' => self::acf_text(self::acf_first($fields, ['facebook', 'social_facebook'])),
            'instagram' => self::acf_text(self::acf_first($fields, ['instagram', 'social_instagram'])),
            'whatsapp' => self::acf_text(self::acf_first($fields, ['whatsapp_link', 'whatsapp', 'social_whatsapp'])),
            'youtube' => self::acf_text(self::acf_first($fields, ['youtube', 'social_youtube'])),
        ];
    }

    private static function first_map_url(string $content): ?string
    {
        if (preg_match('/href=["\'](https?:\/\/(?:www\.)?google\.com\/maps[^"\']+)["\']/i', $content, $matches)) {
            return html_entity_decode($matches[1], ENT_QUOTES, 'UTF-8');
        }

        return null;
    }

    private static function static_page_post(string $key, string $lang): ?WP_Post
    {
        if ($key === 'home') {
            $front_id = (int) get_option('page_on_front');
            if ($front_id > 0) {
                $translated_id = self::translated_object_id($front_id, 'page', $lang) ?: $front_id;
                $front_page = get_post($translated_id);
                if ($front_page instanceof WP_Post && $front_page->post_status === 'publish') {
                    return $front_page;
                }
            }
        }

        foreach (self::STATIC_PAGE_SLUGS[$key] ?? [] as $slug) {
            $post = self::find_post_by_slug('page', $slug, $lang);
            if ($post) {
                return $post;
            }

            $source = self::find_post_by_slug('page', $slug, 'az');
            if ($source) {
                $translated_id = self::translated_object_id($source->ID, 'page', $lang);
                $translated = $translated_id ? get_post($translated_id) : null;
                if ($translated instanceof WP_Post && $translated->post_status === 'publish') {
                    self::switch_language($lang);
                    return $translated;
                }

                self::switch_language($lang);
                return $source;
            }
        }

        self::switch_language($lang);
        return null;
    }

    private static function normalize_static_page(WP_Post $post, string $key): array
    {
        $page = self::normalize_post($post);
        $page['acfLabels'] = self::acf_field_labels($post->ID);
        $page['mappedAcf'] = self::map_static_page_fields($key, $page['acf'], $page['content'] ?? '', $page['acfLabels']);
        return $page;
    }

    private static function acf_field_labels(int $post_id): array
    {
        if (!function_exists('get_field_objects')) {
            return [];
        }

        $objects = get_field_objects($post_id);
        if (!is_array($objects)) {
            return [];
        }

        $labels = [];
        foreach ($objects as $name => $field) {
            if (!is_array($field)) {
                continue;
            }

            $field_name = (string) ($field['name'] ?? $name);
            $label = self::clean_text((string) ($field['label'] ?? ''));
            if ($field_name !== '' && $label !== '') {
                $labels[$field_name] = $label;
            }
        }

        return $labels;
    }

    private static function map_static_page_fields(string $key, array $fields, string $content = '', array $field_labels = []): array
    {
        if ($key === 'gallery') {
            return self::map_gallery_fields($fields, $field_labels);
        }

        if ($key === 'home') {
            return self::map_home_fields($fields, $content);
        }

        if ($key === 'partners') {
            return [
                'partners' => self::normalize_partners_value(self::acf_first($fields, ['partners', 'partnyorlar', 'partner_logos', 'loqolar250x150px'])),
                'heroImage' => self::acf_image(self::acf_first($fields, ['hero_image', 'banner_image', 'sekil'])),
            ];
        }

        return [
            'heroTitle' => self::acf_text(self::acf_first($fields, ['hero_title', 'title', 'basliq'])),
            'heroSubtitle' => self::acf_text(self::acf_first($fields, ['hero_subtitle', 'subtitle', 'alt_basliq'])),
            'heroImage' => self::acf_image(self::acf_first($fields, ['hero_image', 'banner_image', 'sekil'])),
            'sections' => self::acf_first($fields, ['sections', 'blocks', 'content_blocks'], []),
        ];
    }

    private static function map_home_fields(array $fields, string $content = ''): array
    {
        $before_after = [];
        foreach ([1, 2] as $index) {
            $before = self::acf_image(self::acf_first($fields, ["əvvəl_{$index}", "evvel_{$index}"]));
            $after = self::acf_image(self::acf_first($fields, ["sonra_{$index}__867x640", "sonra_{$index}"]));
            if ($before && $after) {
                $before_after[] = [
                    'title' => (string) $index,
                    'before' => $before,
                    'after' => $after,
                ];
            }
        }
        $before_after = self::merge_before_after_items($before_after, self::home_content_before_after($content));

        $testimonials = [];
        foreach (range(1, 5) as $index) {
            $name = self::acf_text(self::acf_first($fields, ["ad_{$index}", "name_{$index}"]));
            $text = self::acf_text(self::acf_first($fields, ["mustəri_mətn_{$index}", "musteri_metn_{$index}", "text_{$index}"]));
            $image = self::acf_image(self::acf_first($fields, ["mustəri_səkil_{$index}", "musteri_sekil_{$index}", "image_{$index}"]));
            if ($name || $text || $image) {
                $testimonials[] = [
                    'name' => $name,
                    'text' => $text,
                    'image' => $image,
                ];
            }
        }

        $about_text = self::acf_text(self::acf_first($fields, ['sirkət_haqqinda', 'sirket_haqqinda']));

        return [
            'heroSlides' => self::acf_first($fields, ['hero_slides', 'slider', 'slides'], []),
            'partners' => self::normalize_partners_value(self::acf_first($fields, ['partners', 'partnyorlar', 'partner_logos', 'loqolar250x150px'])),
            'servicesTitle' => self::acf_text(self::acf_first($fields, ['services_title', 'xidmetler_basliq'])),
            'packagesTitle' => self::acf_text(self::acf_first($fields, ['packages_title', 'paketler_basliq'])),
            'about' => self::first_non_empty([
                self::acf_first($fields, ['about', 'haqqinda'], []),
                $about_text ? ['paragraphs' => [$about_text]] : [],
            ], []),
            'beforeAfter' => self::first_non_empty([
                self::acf_first($fields, ['before_after', 'evvel_sonra'], []),
                $before_after,
            ], []),
            'beforeAfterPartnerTitle' => self::acf_text(self::acf_first($fields, ['before_after_partner_title', 'partners_title', 'partnyorlar_basliq'])),
            'testimonialsTitle' => self::acf_text(self::acf_first($fields, ['testimonials_title', 'reviews_title', 'reyler_basliq'])),
            'testimonials' => self::first_non_empty([
                self::acf_first($fields, ['testimonials', 'reviews', 'reyler'], []),
                $testimonials,
            ], []),
        ];
    }

    private static function map_gallery_fields(array $fields, array $field_labels = []): array
    {
        $legacy_items = array_merge(
            self::acf_gallery_items_with_category($fields, 'home-office', ['ev_və_ofis_təmizliyi_səkiller']),
            self::acf_gallery_items_with_category($fields, 'garden', ['bag_evlərinin_təmizlənməsi_səkillər']),
            self::acf_gallery_items_with_category($fields, 'area', ['ərazi_təmizliyi_səkillər']),
            self::acf_gallery_items_with_category($fields, 'facade', ['fasad_təmizliyi_səkillər']),
            self::acf_gallery_items_with_category($fields, 'curtains', ['pərdə_və_jaluz_yuma_səkillər']),
            self::acf_gallery_items_with_category($fields, 'furniture', ['yumsaq_mebellərin_kimyəvi_təmizliyi_səkillər']),
            self::acf_gallery_items_with_category($fields, 'fragrance', ['ətirləndirmə_xidməti_səkillər']),
            self::acf_gallery_items_with_category($fields, 'restaurant-hotel', ['restoran_və_hotel_təmizliyi'])
        );
        $legacy_categories = [];
        foreach ($legacy_items as $item) {
            $legacy_categories = array_merge($legacy_categories, $item['categories'] ?? []);
        }

        return [
            'title' => self::acf_text(self::acf_first($fields, ['title', 'gallery_title', 'qalereya_basliq'])),
            'subtitle' => self::acf_text(self::acf_first($fields, ['subtitle', 'gallery_subtitle', 'qalereya_alt_basliq'])),
            'categories' => self::first_non_empty([
                self::acf_text_list(self::acf_first($fields, ['gallery_categories', 'categories', 'kateqoriyalar'])),
                array_values(array_unique($legacy_categories)),
            ], []),
            'categoryLabels' => self::gallery_category_labels($fields, $field_labels, array_values(array_unique($legacy_categories))),
            'items' => self::first_non_empty([
                self::acf_gallery_items(self::acf_first($fields, ['gallery_items', 'gallery', 'qalereya', 'sekiller', 'images'])),
                $legacy_items,
            ], []),
            'videoUrl' => self::acf_text(self::acf_first($fields, ['gallery_video_url', 'video_url', 'youtube_url', 'youtube_link'])),
        ];
    }

    private static function gallery_category_labels(array $fields, array $field_labels, array $categories): array
    {
        $labels = [];
        foreach ($fields as $name => $value) {
            if (!isset($field_labels[$name])) {
                continue;
            }

            if (self::acf_gallery_items($value) === []) {
                continue;
            }

            $labels[] = $field_labels[$name];
        }

        $labels = array_values(array_unique(array_filter($labels, [self::class, 'has_value'])));
        if (count($labels) >= count($categories)) {
            return array_slice($labels, 0, count($categories));
        }

        return $labels ?: $categories;
    }

    private static function acf_gallery_items_with_category(array $fields, string $category, array $keys): array
    {
        $items = self::acf_gallery_items(self::acf_first($fields, $keys, []));

        return array_map(static function (array $item) use ($category): array {
            $item['categories'] = [$category];
            return $item;
        }, $items);
    }

    private static function acf_first(array $fields, array $keys, $fallback = null)
    {
        foreach ($keys as $key) {
            if (array_key_exists($key, $fields) && self::has_value($fields[$key])) {
                return $fields[$key];
            }
        }

        return $fallback;
    }

    private static function first_non_empty(array $values, $fallback = null)
    {
        foreach ($values as $value) {
            if (self::has_value($value)) {
                return $value;
            }
        }

        return $fallback;
    }

    private static function has_value($value): bool
    {
        if ($value === null || $value === false || $value === '') {
            return false;
        }

        return !is_array($value) || count(array_filter($value, [self::class, 'has_value'])) > 0;
    }

    private static function acf_text($value): ?string
    {
        if (is_scalar($value)) {
            return self::clean_text((string) $value) ?: null;
        }

        return null;
    }

    private static function acf_text_list($value): array
    {
        if (!is_array($value)) {
            $text = self::acf_text($value);
            return $text ? [$text] : [];
        }

        $items = [];
        foreach ($value as $item) {
            $text = is_array($item) ? self::acf_text(self::first_non_empty($item)) : self::acf_text($item);
            if ($text) {
                $items[] = $text;
            }
        }

        return array_values(array_unique($items));
    }

    private static function acf_image($value): ?array
    {
        if (is_numeric($value)) {
            return self::media((int) $value);
        }

        if (is_array($value) && isset($value['url'])) {
            return [
                'id' => (int) ($value['id'] ?? $value['ID'] ?? 0),
                'url' => esc_url_raw((string) $value['url']),
                'alt' => (string) ($value['alt'] ?? ''),
                'width' => $value['width'] ?? null,
                'height' => $value['height'] ?? null,
                'sizes' => $value['sizes'] ?? [],
            ];
        }

        if (is_string($value) && preg_match('/^https?:\/\//', $value)) {
            return [
                'id' => 0,
                'url' => esc_url_raw($value),
                'alt' => '',
                'width' => null,
                'height' => null,
                'sizes' => [],
            ];
        }

        return null;
    }

    private static function acf_gallery_items($value): array
    {
        if (!$value) {
            return [];
        }

        $source = is_array($value) ? array_values($value) : [$value];
        $items = [];
        foreach ($source as $index => $item) {
            $image = self::acf_image($item);
            $categories = [];
            $title = null;

            if (is_array($item) && !$image) {
                $image = self::acf_image($item['image'] ?? $item['sekil'] ?? $item['photo'] ?? $item['url'] ?? null);
                $categories = self::acf_text_list($item['categories'] ?? $item['category'] ?? $item['kateqoriya'] ?? []);
                $title = self::acf_text($item['title'] ?? $item['name'] ?? '');
            }

            if ($image) {
                $items[] = [
                    'id' => $image['id'] ?: 'gallery-' . $index,
                    'title' => $title,
                    'image' => $image,
                    'url' => $image['url'],
                    'categories' => $categories,
                ];
            }
        }

        return $items;
    }

    private static function partners_from_options(): array
    {
        if (!function_exists('get_field')) {
            return [];
        }

        foreach (['partners', 'partnyorlar', 'partner_logos', 'loqolar250x150px'] as $field) {
            $partners = self::normalize_partners_value(get_field($field, 'option'));
            if ($partners) {
                return $partners;
            }
        }

        return [];
    }

    private static function partners_from_page(string $lang): array
    {
        $page = self::static_page_post('partners', $lang);
        if (!$page || !function_exists('get_field')) {
            return [];
        }

        foreach (['partners', 'partnyorlar', 'partner_logos', 'loqolar250x150px'] as $field) {
            $partners = self::normalize_partners_value(get_field($field, $page->ID));
            if ($partners) {
                return $partners;
            }
        }

        $fields = self::acf_fields($page->ID);
        return self::normalize_partners_value($fields['partners'] ?? $fields['partnyorlar'] ?? $fields['partner_logos'] ?? $fields['loqolar250x150px'] ?? []);
    }

    private static function partners_from_posts(): array
    {
        foreach (['partners', 'partner', 'partnyorlar'] as $post_type) {
            if (!post_type_exists($post_type)) {
                continue;
            }

            $query = new WP_Query([
                'post_type' => $post_type,
                'post_status' => 'publish',
                'posts_per_page' => 100,
                'orderby' => 'menu_order date',
                'order' => 'ASC',
                'suppress_filters' => false,
            ]);

            if ($query->posts) {
                return array_map([self::class, 'normalize_partner_post'], $query->posts);
            }
        }

        return [];
    }

    private static function normalize_partners_value($value): array
    {
        if (!$value) {
            return [];
        }

        if (is_array($value) && isset($value['ID'], $value['url'])) {
            return [self::normalize_partner_item($value, 0)];
        }

        if (!is_array($value)) {
            return [];
        }

        $items = [];
        foreach (array_values($value) as $index => $item) {
            $partner = self::normalize_partner_item($item, $index);
            if ($partner['logo']) {
                $items[] = $partner;
            }
        }

        return $items;
    }

    private static function normalize_partner_item($item, int $index): array
    {
        if (is_numeric($item)) {
            $logo = self::media((int) $item);
            return [
                'id' => (int) $item,
                'title' => $logo['alt'] ?? '',
                'url' => '',
                'logo' => $logo,
            ];
        }

        if (is_string($item)) {
            $logo = self::normalize_partner_logo($item);
            return [
                'id' => 'partner-' . $index,
                'title' => $logo['alt'] ?? '',
                'url' => '',
                'logo' => $logo,
            ];
        }

        if (is_array($item) && isset($item['url'])) {
            $logo = self::acf_image($item);
            return [
                'id' => (int) ($item['id'] ?? $item['ID'] ?? 0),
                'title' => $logo['alt'] ?? '',
                'url' => '',
                'logo' => $logo,
            ];
        }

        if (!is_array($item)) {
            return [
                'id' => 'partner-' . $index,
                'title' => '',
                'url' => '',
                'logo' => null,
            ];
        }

        $logo_value = $item['logo'] ?? $item['image'] ?? $item['sekil'] ?? $item['partner_logo'] ?? null;
        $logo = self::normalize_partner_logo($logo_value);

        return [
            'id' => isset($item['id']) ? (int) $item['id'] : 'partner-' . $index,
            'title' => self::clean_text((string) ($item['name'] ?? $item['title'] ?? $item['label'] ?? ($logo['alt'] ?? ''))),
            'url' => isset($item['url']) ? esc_url_raw((string) $item['url']) : '',
            'logo' => $logo,
        ];
    }

    private static function normalize_partner_post(WP_Post $post): array
    {
        $fields = self::acf_fields($post->ID);
        $logo = self::normalize_partner_logo($fields['logo'] ?? $fields['image'] ?? null);
        if (!$logo) {
            $thumbnail_id = get_post_thumbnail_id($post);
            $logo = $thumbnail_id ? self::media($thumbnail_id) : null;
        }

        return [
            'id' => (int) $post->ID,
            'title' => html_entity_decode(get_the_title($post), ENT_QUOTES, 'UTF-8'),
            'url' => isset($fields['url']) ? esc_url_raw((string) $fields['url']) : '',
            'logo' => $logo,
        ];
    }

    private static function normalize_partner_logo($value): ?array
    {
        if (is_numeric($value)) {
            return self::media((int) $value);
        }

        if (is_string($value) && preg_match('#^https?://|^/#', $value)) {
            return [
                'id' => md5($value),
                'url' => esc_url_raw($value),
                'alt' => '',
                'width' => null,
                'height' => null,
                'sizes' => [],
            ];
        }

        if (is_array($value)) {
            if (isset($value['ID'], $value['url'])) {
                return self::normalize_acf_value($value);
            }

            if (isset($value['id'], $value['url'])) {
                $value['ID'] = $value['id'];
                return self::normalize_acf_value($value);
            }
        }

        return null;
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
        $post = get_post($post_id);
        $title = self::yoast_text($post_id, '_yoast_wpseo_title');
        $description = self::yoast_text($post_id, '_yoast_wpseo_metadesc');
        $canonical = self::yoast_text($post_id, '_yoast_wpseo_canonical');
        $og_title = self::yoast_text($post_id, '_yoast_wpseo_opengraph-title');
        $og_description = self::yoast_text($post_id, '_yoast_wpseo_opengraph-description');
        $twitter_title = self::yoast_text($post_id, '_yoast_wpseo_twitter-title');
        $twitter_description = self::yoast_text($post_id, '_yoast_wpseo_twitter-description');
        $focus_keyphrase = self::yoast_text($post_id, '_yoast_wpseo_focuskw');
        $breadcrumbs_title = self::yoast_text($post_id, '_yoast_wpseo_bctitle');
        $schema_page_type = self::yoast_text($post_id, '_yoast_wpseo_schema_page_type');
        $schema_article_type = self::yoast_text($post_id, '_yoast_wpseo_schema_article_type');
        $presentation = null;

        if (function_exists('YoastSEO')) {
            try {
                $presentation = YoastSEO()->meta->for_post($post_id);
                $title = $title ?: self::presentation_text($presentation, 'title');
                $description = $description ?: self::presentation_text($presentation, 'description');
                $canonical = $canonical ?: self::presentation_text($presentation, 'canonical');
                $og_title = $og_title ?: self::presentation_text($presentation, 'open_graph_title');
                $og_description = $og_description ?: self::presentation_text($presentation, 'open_graph_description');
                $twitter_title = $twitter_title ?: self::presentation_text($presentation, 'twitter_title');
                $twitter_description = $twitter_description ?: self::presentation_text($presentation, 'twitter_description');
            } catch (Throwable $error) {
                // Fall back to saved Yoast post meta if the presentation API is unavailable.
            }
        }

        $robots_noindex = get_post_meta($post_id, '_yoast_wpseo_meta-robots-noindex', true);
        $robots_nofollow = get_post_meta($post_id, '_yoast_wpseo_meta-robots-nofollow', true);
        $robots_advanced = get_post_meta($post_id, '_yoast_wpseo_meta-robots-adv', true);

        return [
            'title' => $title ?: null,
            'description' => $description ?: null,
            'canonical' => $canonical ?: null,
            'focusKeyphrase' => $focus_keyphrase ?: null,
            'breadcrumbsTitle' => $breadcrumbs_title ?: null,
            'schemaPageType' => $schema_page_type ?: null,
            'schemaArticleType' => $schema_article_type ?: null,
            'schema' => self::yoast_schema($post_id, $presentation),
            'robots' => [
                'index' => $robots_noindex === '1' ? false : null,
                'follow' => $robots_nofollow === '1' ? false : null,
                'advanced' => $robots_advanced ? array_values(array_filter(array_map('trim', explode(',', $robots_advanced)))) : [],
            ],
            'openGraph' => [
                'title' => $og_title ?: null,
                'description' => $og_description ?: null,
                'image' => self::yoast_image($post_id, '_yoast_wpseo_opengraph-image', '_yoast_wpseo_opengraph-image-id'),
            ],
            'twitter' => [
                'title' => $twitter_title ?: null,
                'description' => $twitter_description ?: null,
                'image' => self::yoast_image($post_id, '_yoast_wpseo_twitter-image', '_yoast_wpseo_twitter-image-id'),
            ],
        ];
    }

    private static function yoast_text(int $post_id, string $meta_key): ?string
    {
        $value = get_post_meta($post_id, $meta_key, true);
        if (!$value) {
            return null;
        }

        $post = get_post($post_id);
        if ($post instanceof WP_Post && function_exists('wpseo_replace_vars')) {
            $value = wpseo_replace_vars((string) $value, $post);
        }

        return self::clean_text((string) $value) ?: null;
    }

    private static function presentation_text($presentation, string $property): ?string
    {
        if (!is_object($presentation) || !isset($presentation->{$property})) {
            return null;
        }

        return self::clean_text((string) $presentation->{$property}) ?: null;
    }

    private static function yoast_schema(int $post_id, $presentation = null)
    {
        $saved = get_post_meta($post_id, '_yoast_wpseo_schema_graph', true);
        $schema = self::decode_schema_value($saved);
        if ($schema !== null) {
            return $schema;
        }

        if ($presentation === null && function_exists('YoastSEO')) {
            try {
                $presentation = YoastSEO()->meta->for_post($post_id);
            } catch (Throwable $error) {
                $presentation = null;
            }
        }

        if (is_object($presentation)) {
            foreach (['schema', 'schema_graph', 'json_ld'] as $property) {
                if (isset($presentation->{$property})) {
                    $schema = self::decode_schema_value($presentation->{$property});
                    if ($schema !== null) {
                        return $schema;
                    }
                }
            }
        }

        return null;
    }

    private static function decode_schema_value($value)
    {
        if (is_array($value) && $value) {
            return self::normalize_acf_value($value);
        }

        if (is_object($value)) {
            return self::normalize_acf_value(json_decode(wp_json_encode($value), true));
        }

        if (is_string($value) && trim($value) !== '') {
            $decoded = json_decode($value, true);
            return is_array($decoded) ? self::normalize_acf_value($decoded) : null;
        }

        return null;
    }

    private static function yoast_image(int $post_id, string $url_key, string $id_key): ?string
    {
        $url = get_post_meta($post_id, $url_key, true);
        if ($url) {
            return esc_url_raw((string) $url);
        }

        $attachment_id = (int) get_post_meta($post_id, $id_key, true);
        if ($attachment_id > 0) {
            $attachment_url = wp_get_attachment_url($attachment_id);
            return $attachment_url ? esc_url_raw($attachment_url) : null;
        }

        return null;
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
        if (is_array($value)) {
            return self::normalize_acf_value($value);
        }

        if (is_numeric($value)) {
            return self::media((int) $value);
        }

        if (is_string($value) && $value !== '') {
            return [
                'id' => $field,
                'url' => esc_url_raw($value),
                'alt' => get_bloginfo('name'),
                'width' => null,
                'height' => null,
            ];
        }

        return null;
    }

    private static function custom_logo(): ?array
    {
        $logo_id = (int) get_theme_mod('custom_logo');
        return $logo_id > 0 ? self::media($logo_id) : null;
    }

    private static function site_icon(): ?array
    {
        $icon_id = (int) get_option('site_icon');
        if ($icon_id <= 0) {
            $icon_id = (int) get_theme_mod('site_icon');
        }

        if ($icon_id > 0) {
            $media = self::media($icon_id);
            if ($media) {
                return $media;
            }
        }

        $url = get_site_icon_url(512);
        return is_string($url) && $url !== ''
            ? [
                'id' => 'site_icon',
                'url' => $url,
                'alt' => get_bloginfo('name'),
                'width' => null,
                'height' => null,
            ]
            : null;
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

    private static function revalidate_urls(): array
    {
        $raw_urls = [];

        if (defined('ONE66_REVALIDATE_URLS')) {
            $configured = constant('ONE66_REVALIDATE_URLS');
            $raw_urls = is_array($configured) ? $configured : preg_split('/[\s,]+/', (string) $configured);
        }

        if ($raw_urls === [] && defined('ONE66_REVALIDATE_URL')) {
            $raw_urls = [(string) constant('ONE66_REVALIDATE_URL')];
        }

        if ($raw_urls === []) {
            $env_urls = getenv('ONE66_REVALIDATE_URLS');
            if (is_string($env_urls) && $env_urls !== '') {
                $raw_urls = preg_split('/[\s,]+/', $env_urls);
            }
        }

        if ($raw_urls === []) {
            $env_url = getenv('ONE66_REVALIDATE_URL');
            if (is_string($env_url) && $env_url !== '') {
                $raw_urls = [$env_url];
            }
        }

        return array_values(array_unique(array_filter(array_map(static function ($url): string {
            $url = trim((string) $url);
            return $url !== '' ? esc_url_raw($url) : '';
        }, $raw_urls ?: []))));
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
