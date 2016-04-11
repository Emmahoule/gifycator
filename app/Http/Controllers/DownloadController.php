<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;


class DownloadController extends Controller
{
	/**
	 * Download File
	 * - Request : URL
	 * - Response : URL
	*/
	public function downloadFile(Request $request) {

		$url = $request->input("url");

	    $tmpPath = "tmp";

		$extension = pathinfo($url, PATHINFO_EXTENSION);

	    // Génération d'un nom de fichier pas encore existant
        do {
            $random = str_random(10);
            $newFileName = $random . '.' . $extension;
        } while(file_exists($tmpPath . '/' . $newFileName));

	 	$newfname = $tmpPath . '/' . $newFileName;

	    $gif = file_get_contents($url);
		file_put_contents($newfname, $gif);

	    if ($extension=='gif'){
			do {
				$newFileName = str_random(10);
			} while(file_exists($tmpPath . '/' . $newFileName));

			$webmFilePath = $tmpPath.'/'.$newFileName.".webm";
			shell_exec("./ffmpeg -f ".$extension." -i ".$newfname." ".$webmFilePath." 2> ffmpeg-error.log");
			
			unlink($newfname);

			return $webmFilePath;
		} else {				
			return $newfname;
		}
	}
}
