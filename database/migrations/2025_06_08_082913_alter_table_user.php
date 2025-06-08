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
            $table->boolean('is_organization')->default(false);
            $table->integer('parent_id')->nullable();
            $table->string('job_title')->nullable();
            $table->integer('department_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->removeColumn(['is_organization', 'is_organization', 'job_title', 'department_id']);
        });
    }
};
