<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

/**
 * DownloadController
 * 
 * Controller qui gère le téléchargement
 * de fichier via une URL
*/
class DownloadController extends Controller
{

    /**
     * downloadFile
     *
     * - Parameter : request (URL)
     * - Route : api/download-file
     * - Method : POST
     * - Response : chemin fichier téléchargé
    */
	public function downloadFile(Request $request) {

		// Récupération de la requête
		$url = $request->input("url");

	    $tmpPath = "tmp";
		$extension = pathinfo($url, PATHINFO_EXTENSION);

	    // Génération d'un nom de fichier pas encore existant
        do {
            $random = str_random(10);
            $newFileName = $random . '.' . $extension;
        } while(file_exists($tmpPath . '/' . $newFileName));

	 	$newfname = $tmpPath . '/' . $newFileName;

	 	// Récupération du contenu de l'URL
	    $gif = file_get_contents($url);

	    // Enregistrement du fichier
		file_put_contents($newfname, $gif);

		// Si c'est un .gif
	    if ($extension=='gif'){

	    	// Génération d'un nom de fichier pas encore existant
			do {
				$newFileName = str_random(10);
			} while(file_exists($tmpPath . '/' . $newFileName));

			$webmFilePath = $tmpPath.'/'.$newFileName.".webm";

			// Conversion du fichier .gif en .webm
			shell_exec("ffmpeg -f ".$extension." -i ".$newfname." ".$webmFilePath." 2> ffmpeg-error.log");
			
			// Suppression de l'ancien fichier .gif dont on n'a plus besoin
			unlink($newfname);

			// Retour du chemin du fichier
			return $webmFilePath;

		} else {

			// Retour du chemin du fichier				
			return $newfname;
		}
	}
}
