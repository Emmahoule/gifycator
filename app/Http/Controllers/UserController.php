<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\User;
use App\Http\Requests;
use App\Http\Controllers\Controller;

use GenTux\Jwt\JwtToken;

/**
 * UserController
 * 
 * Controller qui gère la génération de token
 * à l'authentification
*/
class UserController extends Controller {

    /**
     * auth
     *
     * - Parameter : jwt, request
     * - Route : api/category
     * - Method : GET
     * - Response : liste catégories
    */
    public function auth(JwtToken $jwt, Request $request)
    {

        // Récupération de la requête
        $email = $request->input('email');
        $password = $request->input('password');

        // Recherche de l'utilisateur dans la BDD
        $user = User::where('email', $email)->get();

        // Si l'utilisateur existe
        if (count($user)>0) {

            // Génération du token
            $token = $jwt->createToken($user);

            // Retour du token
            return response()->json(['token' => $token]);
       
        // Sinon
        } else {

            // Retour d'une erreur
            return response()->json(['error' => 'Email or password invalid'], 404);
        }
    }
}
