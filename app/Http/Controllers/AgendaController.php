<?php

namespace App\Http\Controllers;

use App\Models\Agenda;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AgendaController extends Controller
{

    public function index()
    {
        return Inertia::render('admin/agenda/index');
    }

}
