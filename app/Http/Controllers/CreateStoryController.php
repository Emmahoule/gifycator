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
		
		$uploadPath = config('images.path');

		foreach ($image as $file) {
			if ($file=="null"){
				continue;
			}
			if (is_object($file)){
				$filePath = $file->getPathName();
			} else {
				$filePath = $file;
			}
			array_push($tabImg, $filePath);
		}
		
		do {
			$newFileName = str_random(10) . '.webm';
		} while(file_exists($uploadPath . '/' . $newFileName));

		$newFilePath = $uploadPath.'/'.$newFileName;
		$cmd = './ffmpeg -f webm -i '.$tabImg[0].' -f webm -i '.$tabImg[1].' -filter_complex "[0:0] scale=size=500x500:force_original_aspect_ratio=decrease,pad=width=500:height=500:x=(out_w-in_w)/2:y=(out_h-in_h)/2,setsar=1 [v1];[1:0] scale=size=500x500:force_original_aspect_ratio=decrease,pad=w=500:h=500:x=(out_w-in_w)/2:y=(out_h-in_h)/2,setsar=1 [v2];[v1][v2] concat=n=2:v=1:a=0 [v]" -map "[v]" -y '.$newFilePath.' 2> ffmpeg-error.log';
		shell_exec($cmd);

		return $newFilePath;

	}
}
