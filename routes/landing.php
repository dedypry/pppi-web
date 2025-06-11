<?php

use App\Http\Controllers\Landing\HistoryController;
use App\Http\Controllers\LandingController;
use Illuminate\Support\Facades\Route;

Route::get('/', [LandingController::class, 'index'])->name('home');
Route::get('/visi-misi', [LandingController::class, 'visiMisi'])->name('visi.misi');
Route::get('/organization', [LandingController::class, 'organization'])->name('organization');
Route::get('history',[HistoryController::class,'index'])->name('history');
