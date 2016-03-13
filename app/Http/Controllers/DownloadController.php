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

	    $uploadPath = config('images.path');
	 	$newfname = $uploadPath . '/' . basename($url);
		$extension = pathinfo($url, PATHINFO_EXTENSION);

	    $gif = file_get_contents($url);
		file_put_contents($newfname, $gif);

	    if ($extension=='gif'){
			do {
				$newFileName = str_random(10);
			} while(file_exists($uploadPath . '/' . $newFileName));

			$webmFilePath = $uploadPath.'/'.$newFileName.".webm";
			shell_exec("./ffmpeg -f ".$extension." -i ".$newfname." ".$webmFilePath." 2> ffmpeg-error.log");

			return $webmFilePath;
		} else {				
			return $newfname;
		}
	}
}
