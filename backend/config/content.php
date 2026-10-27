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
