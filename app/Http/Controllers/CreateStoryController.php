<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

/**
 * CreateStoryController
 * 
 * Controller qui gère la création d'histoire
*/
class CreateStoryController extends Controller
{

    /**
     * createStory
     *
     * - Parameter : request (files ou URL gif)
     * - Route : api/create-story
     * - Method : POST
     * - Response : chemin histoire
    */
	public function createStory(Request $request) {
		
		$image = $request->toArray();
		$tabImg = [];
		$tmpPath = "tmp";
		$listFiles = "";
		$convert="";
		$cpt=1;
		$cpt2=0;
		$v="";

		// Pour chaque élément de la requête
		foreach ($image as $file) {

			// Si il est vide, on continue
			if ($file=="null"){
				continue;
			}

			// Si c'est un objet
			if (is_object($file)){

				// Stockage de son chemin et son extension
				$filePath = $file->getPathName();
				$extension = $file->getClientOriginalExtension();
				
				// Si c'est un gif, conversion en webm
				if ($extension=="gif") {
					$filePath = $filePath.".webm";
					shell_exec("ffmpeg -f ".$extension." -i ".$filePath." ".$webmFilePath." 2> ffmpeg-error.log");
				} 

			// Sinon
			} else {

				// Stockage de sa valeur
				$filePath = $file;
			}

			// Ajout du chemin dans un tableau
			$listFiles.='-f webm -i '.$filePath.' '; 

			// Construction des éléments nécessaires pour exécuter la commande FFMPEG
			$convert.='['.$cpt2.':0] scale=size=320x320:force_original_aspect_ratio=decrease,pad=width=320:height=320:x=(out_w-in_w)/2:y=(out_h-in_h)/2:color=white,setsar=1 [v'.$cpt.'];';
			$v.='[v'.$cpt.']';
			$cpt ++;
			$cpt2 ++;
		}
		
		// Génération d'un nom de fichier qui n'est pas existant
		do {
			$newStoryName = str_random(10) . '.webm';
		} while(file_exists($tmpPath . '/' . $newStoryName));

		$newStoryName = $tmpPath.'/'.$newStoryName;

		// Exécution de la commande FFMPEG
		$cmd = 'ffmpeg '.$listFiles.'-filter_complex "'.$convert.$v.' concat=n='.$cpt2.':v=1:a=0 [v]" -map "[v]" -y '.$newStoryName.' 2> ffmpeg-error.log';
		shell_exec($cmd);

		// Suppression des images dont on n'a plus besoin
		foreach ($image as $file) {
			if (!is_object($file)){
				unlink($file);
			}
		}

		// Retour du chemin de l'histoire créee
		return $newStoryName;

	}
}
