<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('nia')->nullable();
            $table->string('status')->nullable();
        });
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->nullOnDelete('cascade');
            $table->string('nik')->nullable();
            $table->string('place_birth')->nullable();
            $table->date('date_birth')->nullable();
            $table->enum('gender',['male','female'])->nullable();
            $table->enum('citizenship',['wni','wna'])->nullable();
            $table->text('address')->nullable();
            $table->integer('province_id')->nullable();
            $table->integer('city_id')->nullable();
            $table->integer('district_id')->nullable();
            $table->string('phone')->nullable();
            $table->string('last_education_nursing')->nullable();
            $table->string('last_education')->nullable();
            $table->string('workplace')->nullable();
            $table->text('hope_in')->nullable();
            $table->text('contribution')->nullable();
            $table->boolean('is_member_payment')->default(true);
            $table->string('member_payment_file')->nullable();
            $table->string('reason_reject')->nullable();
            $table->string('photo')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
