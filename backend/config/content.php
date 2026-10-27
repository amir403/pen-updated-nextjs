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
        'education_models' => [
            'rules' => [
                'anchor' => ['required', 'string', 'max:60', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/'],
                'title' => ['required', 'string', 'max:80'],
                'tag' => ['nullable', 'string', 'max:60'],
                'image' => ['required', 'string', 'max:255'],
                'text' => ['required', 'string', 'max:600'],
            ],
            'attributes' => ['anchor' => 'section link'],
        ],
        'interventions' => [
            'rules' => [
                'title' => ['required', 'string', 'max:80'],
                'text' => ['required', 'string', 'max:300'],
                'image' => ['required', 'string', 'max:255'],
                'href' => ['required', 'string', 'max:300', 'regex:/^(\/|#|https?:\/\/|mailto:)/'],
            ],
            'attributes' => ['href' => 'link'],
        ],
        'programme_pages' => [
            'rules' => [
                'page' => ['required', 'in:pen-academy,teacher-training,academics,scholarships'],
                'image' => ['required', 'string', 'max:255'],
                'title' => ['required', 'string', 'max:120'],
                'text' => ['required', 'array', 'min:1'],
                'text.*' => ['string', 'max:1500'],
                'points' => ['present', 'array', 'max:10'],
                'points.*' => ['string', 'max:200'],
                'cta_label' => ['required', 'string', 'max:60'],
                'cta_href' => ['required', 'string', 'max:300', 'regex:/^(\/|#|https?:\/\/|mailto:)/'],
            ],
            'attributes' => ['cta_label' => 'button text', 'cta_href' => 'button link', 'points.*' => 'point'],
        ],
        'ongoing_programmes' => [
            'rules' => [
                'anchor' => ['required', 'string', 'max:60', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/'],
                'title' => ['required', 'string', 'max:120'],
                'description' => ['required', 'string', 'max:600'],
                'themes' => ['present', 'array', 'max:6'],
                'themes.*' => ['string', 'max:60', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/'],
                'icon' => ['required', 'in:school,handshake,users,graduation,book,laptop,search'],
                'link_href' => ['required', 'string', 'max:300', 'regex:/^(\/|#|https?:\/\/|mailto:)/'],
                'link_label' => ['required', 'string', 'max:80'],
                'resource_title' => ['nullable', 'required_with:resource_href', 'string', 'max:80'],
                'resource_href' => ['nullable', 'string', 'max:300', 'regex:/^(\/|#|https?:\/\/|mailto:)/'],
            ],
            'attributes' => ['anchor' => 'section link', 'themes.*' => 'focus area', 'link_href' => 'link', 'link_label' => 'link text', 'resource_title' => 'resource text', 'resource_href' => 'resource link'],
        ],
        'upcoming_priorities' => [
            'rules' => [
                'anchor' => ['required', 'string', 'max:60', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/'],
                'title' => ['required', 'string', 'max:120'],
                'text' => ['required', 'string', 'max:400'],
                'theme' => ['nullable', 'string', 'max:60', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/'],
                'link_href' => ['required', 'string', 'max:300', 'regex:/^(\/|#|https?:\/\/|mailto:)/'],
                'link_label' => ['required', 'string', 'max:80'],
            ],
            'attributes' => ['anchor' => 'section link', 'theme' => 'focus area', 'link_href' => 'link', 'link_label' => 'link text'],
        ],
        'purpose_cards' => [
            'rules' => [
                'title' => ['required', 'string', 'max:80'],
                'text' => ['required', 'string', 'max:500'],
            ],
        ],
        'journey' => [
            'rules' => [
                'year' => ['required', 'string', 'max:12'],
                'title' => ['required', 'string', 'max:120'],
                'text' => ['required', 'string', 'max:500'],
                'href' => ['nullable', 'string', 'max:300', 'regex:/^(\/|#|https?:\/\/|mailto:)/'],
                'label' => ['nullable', 'required_with:href', 'string', 'max:60'],
            ],
            'attributes' => ['href' => 'link', 'label' => 'link text'],
        ],
        'core_values' => [
            'rules' => [
                'title' => ['required', 'string', 'max:80'],
                'summary' => ['required', 'string', 'max:300'],
                'text' => ['required', 'string', 'max:500'],
                'icon' => ['required', 'in:responsibility,governance,impact,transparency,community,learning'],
            ],
        ],
        'accountability_links' => [
            'rules' => [
                'title' => ['required', 'string', 'max:80'],
                'text' => ['required', 'string', 'max:300'],
                'href' => ['required', 'string', 'max:300', 'regex:/^(\/|#|https?:\/\/|mailto:)/'],
            ],
            'attributes' => ['href' => 'link'],
        ],
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
        'about' => [
            'rules' => [
                'value' => ['required', 'array'],
                'value.story_image' => ['required', 'string', 'max:255'],
                'value.story_since' => ['nullable', 'string', 'max:10'],
                'value.story_heading' => ['required', 'string', 'max:80'],
                'value.story_highlight' => ['nullable', 'string', 'max:80'],
                'value.story_text' => ['required', 'array', 'min:1'],
                'value.story_text.*' => ['string', 'max:1500'],
                'value.ceo_photo' => ['required', 'string', 'max:255'],
                'value.ceo_name' => ['required', 'string', 'max:120'],
                'value.ceo_role' => ['nullable', 'string', 'max:120'],
                'value.ceo_heading' => ['required', 'string', 'max:120'],
                'value.ceo_message' => ['required', 'array', 'min:1'],
                'value.ceo_message.*' => ['string', 'max:2000'],
                'value.ceo_source_url' => ['nullable', 'url', 'max:300'],
            ],
            'attributes' => [
                'value.story_image' => 'story photo',
                'value.story_heading' => 'story heading',
                'value.story_text' => 'story text',
                'value.ceo_photo' => 'CEO photo',
                'value.ceo_name' => 'CEO name',
                'value.ceo_heading' => 'message heading',
                'value.ceo_message' => 'message',
                'value.ceo_source_url' => 'original message link',
            ],
        ],
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
