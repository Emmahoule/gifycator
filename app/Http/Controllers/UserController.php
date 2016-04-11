<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\User;
use App\Http\Requests;
use App\Http\Controllers\Controller;

use GenTux\Jwt\JwtToken;


class UserController extends Controller
{
    public function auth(JwtToken $jwt, Request $request)
    {

    	// Récupération de la requête
        $email = $request->input('email');
        $password = $request->input('password');

        $user = User::where('email', $email)->get();

        if (count($user)>0) {

        	// Génération du token
	        $token = $jwt->createToken($user);
	        return response()->json(['token' => $token]);
       
        } else {

        	// Erreur
        	return response()->json(['error' => 'Email or password invalid'], 404);
        }
    }
}
