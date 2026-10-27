<?php

/*
|--------------------------------------------------------------------------
| Admin-managed website content
|--------------------------------------------------------------------------
|
| "collections" are ordered lists stored in the content_items table (one row
| per item, fields in a JSON column). "settings" are single records stored in
| the settings table under their key, with the payload in `value`.
|
| Each entry's "rules" validate the request body; "attributes" give readable
| field names for validation messages. The Next.js admin panel describes the
| matching form fields in lib/admin-resources.ts.
|
*/

return [

    'collections' => [
        'gallery' => [
            'rules' => [
                'image' => ['required', 'string', 'max:255'],
                'caption' => ['nullable', 'string', 'max:200'],
            ],
        ],
        'partners' => [
            'rules' => [
                'name' => ['required', 'string', 'max:120'],
                'logo' => ['required', 'string', 'max:255'],
                'url' => ['nullable', 'url', 'max:500'],
            ],
            'attributes' => ['url' => 'website link'],
        ],
        'hero_slides' => [
            'rules' => [
                'image' => ['required', 'string', 'max:255'],
                'alt' => ['required', 'string', 'max:160'],
                'kicker' => ['nullable', 'string', 'max:60'],
                'title' => ['required', 'array', 'min:1', 'max:4'],
                'title.*' => ['required', 'string', 'max:60'],
                'highlight' => ['nullable', 'string', 'max:60'],
                'text' => ['nullable', 'string', 'max:300'],
            ],
            'attributes' => ['alt' => 'image description', 'title.*' => 'heading line'],
        ],
        'impact_stats' => [
            'rules' => [
                'value' => ['required', 'integer', 'min:0', 'max:100000000'],
                'label' => ['required', 'string', 'max:60'],
                'icon' => ['required', 'in:school,students,districts,teachers,books,heart'],
            ],
        ],
        'homepage_focus' => [
            'rules' => [
                'anchor' => ['required', 'string', 'max:60', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/'],
                'title' => ['required', 'string', 'max:120'],
                'image' => ['required', 'string', 'max:255'],
                'alt' => ['required', 'string', 'max:160'],
                'text' => ['required', 'string', 'max:500'],
                'featured' => ['nullable', 'string', 'max:160'],
                'sdgs' => ['present', 'array', 'max:6'],
                // Only these SDG graphics exist in public/images/website-outline.
                'sdgs.*' => ['integer', 'in:3,4,5,8,9,10,16,17'],
            ],
            'attributes' => ['anchor' => 'focus area link', 'alt' => 'image description', 'sdgs.*' => 'SDG number'],
        ],
        'offices' => [
            'rules' => [
                'title' => ['required', 'string', 'max:80'],
                'address' => ['required', 'array', 'min:1', 'max:6'],
                'address.*' => ['required', 'string', 'max:120'],
                'map_url' => ['nullable', 'url', 'max:500'],
            ],
            'attributes' => ['address.*' => 'address line', 'map_url' => 'map link'],
        ],
    ],

    'settings' => [
        'homepage' => [
            'rules' => [
                'value' => ['required', 'array'],
                'value.hero_tagline' => ['nullable', 'string', 'max:80'],
                'value.hero_caption' => ['nullable', 'string', 'max:80'],
                'value.stats_kicker' => ['nullable', 'string', 'max:40'],
                'value.stats_heading' => ['nullable', 'string', 'max:80'],
                'value.stats_note' => ['nullable', 'string', 'max:160'],
                'value.about_image' => ['required', 'string', 'max:255'],
                'value.about_since' => ['nullable', 'string', 'max:10'],
                'value.about_heading' => ['required', 'string', 'max:80'],
                'value.about_highlight' => ['nullable', 'string', 'max:80'],
                'value.about_text' => ['required', 'array', 'min:1'],
                'value.about_text.*' => ['string', 'max:1000'],
                'value.focus_heading' => ['required', 'string', 'max:120'],
                'value.focus_intro' => ['nullable', 'string', 'max:400'],
                'value.schools_image' => ['required', 'string', 'max:255'],
                'value.schools_heading' => ['required', 'array', 'min:1', 'max:3'],
                'value.schools_heading.*' => ['string', 'max:60'],
                'value.schools_text' => ['nullable', 'string', 'max:400'],
            ],
            'attributes' => [
                'value.about_image' => 'about image',
                'value.about_heading' => 'about heading',
                'value.about_text' => 'about text',
                'value.focus_heading' => 'focus areas heading',
                'value.schools_image' => 'schools image',
                'value.schools_heading' => 'schools heading',
            ],
        ],
        'contact' => [
            'rules' => [
                'value' => ['required', 'array'],
                'value.email' => ['required', 'email', 'max:120'],
                'value.phones' => ['present', 'array', 'max:6'],
                'value.phones.*' => ['required', 'string', 'max:40', 'regex:/^\+?[0-9 ()-]+$/'],
                'value.whatsapp' => ['present', 'array', 'max:6'],
                'value.whatsapp.*' => ['required', 'string', 'max:40', 'regex:/^\+?[0-9 ()-]+$/'],
                'value.address' => ['required', 'array', 'min:1', 'max:6'],
                'value.address.*' => ['required', 'string', 'max:120'],
            ],
            'attributes' => [
                'value.email' => 'email',
                'value.phones.*' => 'phone number',
                'value.whatsapp.*' => 'WhatsApp number',
                'value.address.*' => 'address line',
            ],
        ],
        'site' => [
            'rules' => [
                'value' => ['required', 'array'],
                'value.topbar_text' => ['nullable', 'string', 'max:120'],
                'value.footer_tagline' => ['nullable', 'string', 'max:200'],
                'value.video_url' => ['nullable', 'url', 'max:300'],
                'value.donation_url' => ['required', 'url', 'max:300'],
                'value.careers_url' => ['required', 'url', 'max:300'],
            ],
            'attributes' => [
                'value.topbar_text' => 'top bar text',
                'value.footer_tagline' => 'footer tagline',
                'value.video_url' => 'video link',
                'value.donation_url' => 'donation page link',
                'value.careers_url' => 'careers form link',
            ],
        ],
        'social_media' => [
            'rules' => [
                'value' => ['present', 'array'],
                'value.*.label' => ['required', 'string', 'max:60'],
                'value.*.href' => ['nullable', 'url', 'max:500'],
            ],
            'attributes' => [
                'value.*.label' => 'label',
                'value.*.href' => 'link',
            ],
        ],
    ],

];
