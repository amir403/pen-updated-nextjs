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
php artisan admin:create you@example.org --name="Your Name"   # prompts for a password (min. 12 characters)
php artisan serve               # http://localhost:8000
```

Point the website at the API by setting `PEN_API_URL` (for example `http://localhost:8000`) where Next.js runs, then sign in at `/admin`.

`APP_URL` must be the public address of this API: uploaded image URLs are built from it.

## Seed data

`database/seeders/data/site-content.json` holds the content the website shipped with (pages, articles, FAQs, schools, documents, founders and social links). `SiteContentSeeder` only fills empty tables, so running `php artisan db:seed` again never overwrites admin edits.

## Endpoints

All responses are JSON. Admin endpoints require `Authorization: Bearer <token>`.

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/content` | Public: everything the website renders, in one response |
| POST | `/api/auth/login` | Email + password → token (rate-limited to 5 attempts per minute; tokens expire after 12 hours) |
| GET | `/api/auth/me` | Signed-in user |
| POST | `/api/auth/logout` | Revoke the current token |
| GET, PUT | `/api/pages`, `/api/pages/{id}` | Page titles and hero text (pages map to website routes, so they cannot be created or deleted) |
| CRUD | `/api/articles`, `/api/faqs`, `/api/schools`, `/api/resources`, `/api/team-members` | `GET` list, `POST` create, `GET/PUT/DELETE /{id}` |
| GET | `/api/settings` | All settings |
| PUT | `/api/settings/social_media` | Footer social links: `{"value": [{"label": "...", "href": "https://..." or null}]}` |
| POST | `/api/uploads` | Multipart `file` (JPG, PNG, WebP or GIF, max 5 MB) → `{"url": "..."}` |

## Tests

```sh
php artisan test     # feature tests run on in-memory SQLite
vendor/bin/pint      # code style
```
