<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Agenda extends Model
{
    protected $guarded = [];

    public function update_by(){
        return $this->belongsTo(User::class,'update_by');
    }
}
