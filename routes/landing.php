<?php

use App\Http\Controllers\Landing\BlogController;
use App\Http\Controllers\Landing\HistoryController;
use App\Http\Controllers\LandingController;
use Illuminate\Support\Facades\Route;

Route::get('/', [LandingController::class, 'index'])->name('home');
Route::get('/visi-misi', [LandingController::class, 'visiMisi'])->name('visi.misi');
Route::get('/organization', [LandingController::class, 'organization'])->name('organization');
Route::get('/blogs', [BlogController::class, 'index'])->name('blogs');
Route::get('/blogs/{id}', [BlogController::class, 'detail'])->name('blogs.detail');
Route::post('/blogs/comment/{id}', [BlogController::class, 'blogComment'])->name('blogs.comment');
Route::get('/gallery', [LandingController::class, 'gallery'])->name('gallery');
Route::get('/contact', [LandingController::class, 'contact'])->name('contact');
Route::get('history',[HistoryController::class,'index'])->name('history');
