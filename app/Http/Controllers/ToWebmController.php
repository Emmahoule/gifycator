<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;


class ToWebmController extends Controller
{

	/**
	 * Convert gif to webm .
	 * - Request : file
	 * - Response : URL
	*/
	public function convertVideo(Request $request) {

		$gif = $request->file("gif");

		$filePath = $gif->getPathName();
		$filename = $gif->getClientOriginalName();
		$extension = $gif->getClientOriginalExtension();
		$uploadPath = config('images.path');

		do {
			$newFileName = str_random(10);
		} while(file_exists($uploadPath . '/' . $newFileName));

		$webmFilePath = $uploadPath.'/'.$newFileName.".webm";
		shell_exec("./ffmpeg -f ".$extension." -i ".$filePath." ".$webmFilePath." 2> ffmpeg-error.log");


		return $webmFilePath;
	}
}
