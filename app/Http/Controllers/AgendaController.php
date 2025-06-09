<?php

namespace App\Http\Controllers;

use App\Models\Agenda;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

        $validate['update_by'] = Auth::user()->id;

        if ($request->id) {
            Agenda::find($request->id)->update($validate);
        } else {
            Agenda::create($validate);
        }

        return back()->with('success', 'Agenda Berhasil Ditambahkan');
    }

    public function update(Request $request, Agenda $agenda){
        $validate = $request->validate([
            'start_at' => 'required|date|before_or_equal:end_at',
            'end_at' => 'required|date|after_or_equal:start_at',
        ]);
    }

    public function destroy(Agenda $agenda){
        $agenda->delete();

        return back()->with('success','data berhasil di hapus');
    }
}
