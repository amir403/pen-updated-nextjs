<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['type', 'title', 'url', 'image', 'position'])]
class Resource extends Model
{
    /**
     * Resource groups shown on the website, keyed by their page slug.
     */
    public const TYPES = ['publications', 'pen-activity-books', 'corporate-information'];
}
