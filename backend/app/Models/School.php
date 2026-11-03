<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['name', 'district', 'enrollment', 'boys', 'girls', 'map', 'position'])]
class School extends Model {}
