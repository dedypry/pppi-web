<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'user_id',
        'nik',
        'place_birth',
        'date_birth',
        'gender',
        'citizenship',
        'address',
        'province_id',
        'city_id',
        'district_id',
        'phone',
        'last_education_nursing',
        'last_education',
        'workplace',
        'hope_in',
        'contribution',
        'is_member_payment',
        'member_payment_file',
        'reason_reject',
        'photo',
        'front_title',
        'back_title',
    ];

    public function province(){
        return $this->belongsTo(Province::class);
    }
    public function city(){
        return $this->belongsTo(City::class);
    }
    public function district(){
        return $this->belongsTo(District::class);
    }
}
