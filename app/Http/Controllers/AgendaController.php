<?php

namespace App\Http\Controllers;

use App\Models\Agenda;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AgendaController extends Controller
{

    public function index()
    {
        $agenda = Agenda::all();
        return Inertia::render('admin/agenda/index', [
            'agenda' => $agenda
        ]);
    }

    public function store(Request $request)
    {
        $validate = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'start_at' => 'required|date|before_or_equal:end_at',
            'end_at' => 'required|date|after_or_equal:start_at',
        ]);

        if ($request->id) {
            Agenda::find($request->id)->update($validate);
        } else {
            Agenda::create($validate);
        }

        return back()->with('success', 'Agenda Berhasil Ditambahkan');
    }
}
