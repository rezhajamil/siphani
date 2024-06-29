<?php

namespace App\Http\Controllers\Dashboard\Admin;

use App\Http\Controllers\Controller;
use App\Models\Unit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UnitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $units = Unit::all();

        return Inertia::render('Dashboard/Admin/Unit/Index', compact('units'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Dashboard/Admin/Unit/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required'
        ]);

        $unit = Unit::create([
            'name' => ucwords($request->name),
            'description' => $request->description
        ]);

        return redirect()->route('admin.unit.index')->with('success');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $unit = Unit::find($id);

        return Inertia::render('Dashboard/Admin/Unit/Edit', compact('unit'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required'
        ]);

        $unit = Unit::find($id);
        $unit->name = ucwords($request->name);
        $unit->description = $request->description;
        $unit->save();

        return redirect()->route('admin.unit.index')->with('success');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
    }

    public function toggleStatus($id)
    {
        $unit = Unit::find($id);

        $unit->status = !$unit->status;
        $unit->save();

        return back();
    }
}
