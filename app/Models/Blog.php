<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'tags' => 'array',
        ];
    }

    public function category()
    {
        return $this->belongsTo(BlogCategory::class);
    }

    public function writer()
    {
        return $this->belongsTo(User::class, 'writer_id');
    }

    public function comments()
    {
        return $this->hasMany(BlogComment::class);
    }
}
