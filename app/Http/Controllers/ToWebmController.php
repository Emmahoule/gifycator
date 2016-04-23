<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

/**
 * ToWebmController
 * 
 * Controller qui convertit un fichier .gif
 * en .webm
*/
class ToWebmController extends Controller
{

    /**
     * convertVideo
     *
     * - Parameter : request (infos user : email, password)
     * - Route : api/auth
     * - Method : POST
     * - Response : token
    */
	public function convertVideo(Request $request) {

		// Récupération de la requête
		$gif = $request->file("gif");

		$filePath = $gif->getPathName();
		$filename = $gif->getClientOriginalName();
		$extension = $gif->getClientOriginalExtension();
	    $tmpPath = "tmp";

	    // Génération d'un nom de fichier qui n'existe pas déjà
		do {
			$newFileName = str_random(10);
		} while(file_exists($tmpPath . '/' . $newFileName));

		$webmFilePath = $tmpPath.'/'.$newFileName.".webm";

		// Exécution de la commande FFPMEG pour convertir le .gif en .webm
		shell_exec("ffmpeg -f ".$extension." -i ".$filePath." ".$webmFilePath." 2> ffmpeg-error.log");

		// Retour du chemin du fichier .webm
		return $webmFilePath;
	}
}
