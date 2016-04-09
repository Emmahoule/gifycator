<?php

namespace App\Http\Controllers;

use DB;
use App\Gif;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class GifController extends Controller{

    public function index(){

        $gifs  = Gif::all();

        return response()->json($gifs);

    }

    public function getGif($id){

        $gif  = Gif::find($id);

        return response()->json($gif);
    }

    public function getGifs($id){

        $gifs  = Gif::where('category', $id)->get();;

        return response()->json($gifs);
    }

    public function countGifs(){
        
        $nbGifs = Gif::select('category', DB::raw('count(*) as total'))
                 ->groupBy('category')
                 ->get();

        return response()->json($nbGifs);
    }

    public function saveGif(Request $request){

        // Récupération de la requête
        $url = $request->input('url');
        $cover = $request->input('cover');
        $title = $request->input('title');
        $author = $request->input('author');
        $category = $request->input('category');
        
        // Récupération du dossier uploads
        $uploadPath = config('images.path');

        // Génération d'un nom de fichier pas encore existant
        do {
            $random = str_random(10);
            $newCoverName = $random . '.png';
        } while(file_exists($uploadPath . '/' . $newCoverName));

        $newGifName = $random . '.webm';

        // Décodage de la photo de couverture (Base64)
        $coverDecoded = base64_decode($cover);
        $coverFileName = $uploadPath.'/'.$newCoverName;
        file_put_contents($coverFileName, $coverDecoded);

        $gifPath = $uploadPath."/".$newGifName;
        rename($url, $gifPath);


        // Insertion des données dans la BDD
        Gif::insert([
            'url' => $gifPath, 
            'cover' => $coverFileName,
            'title' => $title,
            'author' => $author,
            'category' => $category
            ]
        );

        // Renvoie des données en JSON
        return response()->json([
            'url' => $gifPath, 
            'cover' => $coverFileName,
            'title' => $title,
            'author' => $author,
            'category' => $category
            ]);

        // $gif = Gif::create($request->all());

        // return response()->json($gif);

    }

    public function deleteGif($id){
        $gif  = Gif::find($id);

        $gif->delete();

        return response()->json('success');
    }

    public function updateGif(Request $request,$id){
        $gif  = Gif::find($id);

        $gif->url = $request->input('url');
        $gif->cover = $request->input('cover');
        $gif->title = $request->input('title');
        $gif->author = $request->input('author');
        $gif->category = $request->input('category');

        $gif->save();

        return response()->json($gif);
    }

}
