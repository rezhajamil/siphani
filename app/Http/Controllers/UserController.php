<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class UserController extends Controller
{
    public function edit()
    {
        return Inertia::render('User/Edit');
    }

    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|numeric|unique:users.phone',
            'whatsapp' => 'required|numeric|unique:users.whatsapp',
            'gender' => 'required',
            'avatar' => 'image|nullable',
            'password' => ['nullable', 'confirmed', Password::defaults()],
        ]);

        $user = User::find(Auth::user()->id);

        if ($request->hasFile('avatar')) {
            $url = $request->avatar->store('avatar');
            $user->avatar = $url;
        }

        $user->name = ucwords($request->name);
        $user->phone = $request->phone;
        $user->whatsapp = $request->whatsapp;
        $user->gender = $request->gender;
        $user->password = $request->password ?  Hash::make($request->password) : $user->password;
        $user->save();

        return back()->with('success');
    }

    public function changeRole(Request $request)
    {
        $request->validate([
            'role' => ['required', 'string', Rule::in(['Admin', 'Buyer', 'Seller'])],
        ]);

        $user = User::find(Auth::user()->id);
        $user->role = $request->role;
        $user->save();

        return redirect()->back()->with('success');
    }
}
