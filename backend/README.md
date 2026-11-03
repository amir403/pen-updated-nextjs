# PEN API (Laravel)

The Laravel 13 API behind the PEN website's content and the Next.js admin panel (`/admin`). Data is stored in MySQL; admin sign-in uses Laravel Sanctum tokens.

## Setup

Requires PHP 8.3+, Composer and MySQL 8 (or MariaDB 10.6+).

```sh
cd backend
cp .env.example .env            # then set APP_URL and the DB_* values
composer install
php artisan key:generate
php artisan migrate --seed      # creates tables and imports the current website content
php artisan storage:link        # serves uploaded images from /storage
php artisan admin:create you@example.org --name="Your Name"   # first admin; prompts for a password (min. 12 characters). Add more under Admin users in the panel.
php artisan serve               # http://localhost:8000
```

Point the website at the API by setting `PEN_API_URL` (for example `http://localhost:8000`) where Next.js runs, then sign in at `/admin`.

`APP_URL` must be the public address of this API: uploaded image URLs are built from it.

Set `FORMS_PROXY_KEY` to a long random string and give the Next.js site the same value as `PEN_FORMS_KEY`, so the form rate limit counts each visitor separately. Volunteer documents are stored in `storage/app/private/submissions` and are never publicly served; include that folder in backups.

## Updating

After pulling new code:

```sh
composer install
php artisan migrate --force   # new tables or columns
php artisan db:seed --force   # fills newly added modules with the website's current content
```

The seeder only fills empty tables and collections, so existing admin edits are never overwritten.

## Seed data

`database/seeders/data/site-content.json` holds the content the website shipped with: the typed tables (pages, articles, FAQs, schools, documents, founders) plus every collection and setting defined in `config/content.php`. `SiteContentSeeder` only fills empty tables, so running `php artisan db:seed` again never overwrites admin edits.

## Endpoints

All responses are JSON. Admin endpoints require `Authorization: Bearer <token>`.

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/content` | Public: everything the website renders, in one response |
| POST | `/api/forms/contact`, `/api/forms/volunteer` | Public website forms (volunteer: multipart with up to five 5 MB PDF/JPG/PNG `documents[]`). Rejects a filled `website` honeypot; 5 per visitor per 10 minutes |
| GET, PUT, DELETE | `/api/submissions`, `/api/submissions/{id}` | Admin inbox (`?type=contact\|volunteer`, `?status=new\|read\|archived`); opening marks read, delete removes documents |
| GET | `/api/submissions/{id}/files/{index}` | Download a volunteer document (admins only) |
| POST | `/api/auth/login` | Email + password → token (rate-limited to 5 attempts per minute; tokens expire after 12 hours) |
| GET | `/api/auth/me` | Signed-in user |
| POST | `/api/auth/logout` | Revoke the current token |
| PUT | `/api/auth/password` | Change your password (`current_password`, `password`, `password_confirmation`); signs out your other sessions |
| GET, POST, DELETE | `/api/users`, `/api/users/{id}` | Admin users (passwords of at least 12 characters; you cannot remove yourself) |
| GET, PUT | `/api/pages`, `/api/pages/{id}` | Page titles and hero text (pages map to website routes, so they cannot be created or deleted) |
| CRUD | `/api/articles`, `/api/faqs`, `/api/schools`, `/api/resources`, `/api/team-members` | `GET` list, `POST` create, `GET/PUT/DELETE /{id}` |
| GET | `/api/settings` | All settings |
| PUT | `/api/settings/{key}` | A setting defined in `config/content.php`, as `{"value": ...}` (for example `social_media`: `[{"label": "...", "href": "https://..." or null}]`) |
| GET | `/api/summary` | Record counts per module for the admin dashboard |
| CRUD | `/api/collections/{name}` | Items of a collection defined in `config/content.php` (`GET` list, `POST` create, `GET/PUT/DELETE /{id}`) |
| POST | `/api/uploads` | Multipart `file` (JPG, PNG, WebP, GIF, PDF, Word, Excel or PowerPoint, max 10 MB) → `{"url": "..."}` |

## Tests

```sh
php artisan test     # feature tests run on in-memory SQLite
vendor/bin/pint      # code style
```
