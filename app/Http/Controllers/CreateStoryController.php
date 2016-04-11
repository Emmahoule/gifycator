<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;


class CreateStoryController extends Controller
{

	/**
	 * Convert gif to webm .
	 * - Request : file
	 * - Response : URL
	*/
	public function createStory(Request $request) {
		
		$image = $request->toArray();
		$tabImg = [];
		// $tmpPath = config('images.tmpPath');
		$tmpPath = "tmp";
		$listFiles = "";
		$convert="";
		$cpt=1;
		$cpt2=0;
		$v="";

		foreach ($image as $file) {

			// Si la variable est vide, on continue
			if ($file=="null"){
				continue;
			}

			// Si c'est une variable de type objet
			if (is_object($file)){
				$filePath = $file->getPathName();
				$extension = $file->getClientOriginalExtension();
				
				// Si c'est un gif, on le convertit en webm
				if ($extension=="gif") {
					$filePath = $filePath.".webm";
					shell_exec("./ffmpeg -f ".$extension." -i ".$filePath." ".$webmFilePath." 2> ffmpeg-error.log");
				} 

			// Si ce n'est pas une variable de type objet
			} else {
				$filePath = $file;
			}

			// On génère un nom qui n'est pas existant
			// do {
			// 	$newFileName = str_random(10) . '.webm';
			// } while(file_exists($tmpPath . '/' . $newFileName));

			// On ajoute le chemin 
			// $newFilePath = $tmpPath.'/'.$newFileName;

			// shell_exec('./ffmpeg -f webm -i '.$filePath.' -filter_complex "[0:0] scale=size=500x500:force_original_aspect_ratio=decrease,pad=width=500:height=500:x=(out_w-in_w)/2:y=(out_h-in_h)/2,setsar=1" '.$newFilePath.' 2> ffmpeg-error.log');

			// On ajoute le chemin dans un tableau
			// array_push($tabImg, $newFilePath);
			$listFiles.='-f webm -i '.$filePath.' '; 
			$convert.='['.$cpt2.':0] scale=size=320x320:force_original_aspect_ratio=decrease,pad=width=320:height=320:x=(out_w-in_w)/2:y=(out_h-in_h)/2:color=white,setsar=1 [v'.$cpt.'];';
			$v.='[v'.$cpt.']';
			$cpt ++;
			$cpt2 ++;
		}
		
		do {
			$newStoryName = str_random(10) . '.webm';
		} while(file_exists($tmpPath . '/' . $newStoryName));

		$newStoryName = $tmpPath.'/'.$newStoryName;
		$cmd = './ffmpeg '.$listFiles.'-filter_complex "'.$convert.$v.' concat=n='.$cpt2.':v=1:a=0 [v]" -map "[v]" -y '.$newStoryName.' 2> ffmpeg-error.log';
		shell_exec($cmd);

		// Suppression des images dont on n'a plus besoin
		foreach ($image as $file) {
			if (!is_object($file)){
				unlink($file);
			}
		}

		return $newStoryName;

	}
}
