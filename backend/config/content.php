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
        //
    ],

    'settings' => [
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
