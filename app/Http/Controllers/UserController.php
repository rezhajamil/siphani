<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
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
