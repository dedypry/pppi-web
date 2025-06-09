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
        Schema::table('agendas', function (Blueprint $table) {
            $table->dateTime('start_at')->nullable();
            $table->dateTime('end_at')->nullable();
            $table->removeColumn('schedule');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('agendas', function (Blueprint $table) {
            $table->removeColumn(['start_at', 'end_at']);
            $table->dateTime('schedule')->nullable();
        });
    }
};
