<?php

namespace App\Http\Controllers;

use DB;
use App\Gif;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

/**
 * GifController
 * 
 * Controller qui gère les requêtes relatives
 * aux gifs
*/
class GifController extends Controller{

    /**
     * index
     *
     * - Parameter : no
     * - Route : api/gif
     * - Method : GET
     * - Response : liste gifs
    */
    public function index(){

        $gifs  = Gif::all();

        return response()->json($gifs);

    }

    /**
     * getGif
     *
     * - Parameter : id gif à lire
     * - Route : api/gif/{id}
     * - Method : GET
     * - Response : infos gif
    */
    public function getGif($id){

        $gif  = Gif::find($id);

        return response()->json($gif);
    }

    /**
     * getGifs
     *
     * - Parameter : id catégorie des gifs à lire
     * - Route : api/gifs/{id}
     * - Method : GET
     * - Response : liste gifs d'une catégorie
    */
    public function getGifs($id){

        $gifs  = Gif::where('category', $id)->get();;

        return response()->json($gifs);
    }

    /**
     * countGifs
     *
     * - Parameter : no
     * - Route : api/count-gifs
     * - Method : GET
     * - Response : liste catégories avec leur nombre de gifs
    */
    public function countGifs(){
        
        $nbGifs = Gif::select('category', DB::raw('count(*) as total'))
                 ->groupBy('category')
                 ->get();

        return response()->json($nbGifs);
    }

    /**
     * saveGif
     *
     * - Parameter : request (infos gif à ajouter)
     * - Route : api/gif
     * - Method : POST
     * - Response : infos gif ajouté
    */
    public function saveGif(Request $request){

        // Récupération de la requête
        $url = $request->input('url');
        $cover = $request->input('cover');
        $title = $request->input('title');
        $author = $request->input('author');
        $category = $request->input('category');
        
        // Récupération du dossier uploads
        $uploadPath = "uploads";

        // Génération d'un nom de fichier pas encore existant
        do {
            $random = str_random(10);
            $newCoverName = $random . '.png';
        } while(file_exists($uploadPath . '/' . $newCoverName));

        $newGifName = $random . '.webm';

        // Décodage  et enregistrement de la photo de couverture (Base64)
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

        // Récupération du nouvel ID généré
        $id = Gif::select('id')->where('url', '=', $gifPath)->get();

        // Renvoie des données en JSON
        return response()->json([
            'id' => $id,
            'url' => $gifPath, 
            'cover' => $coverFileName,
            'title' => $title,
            'author' => $author,
            'category' => $category
            ]);
    }

    /**
     * deleteGifs
     *
     * - Parameter : id gif à supprimer
     * - Route : api/gif/{id}
     * - Method : DELETE
     * - Response : infos gif supprimé
    */
    public function deleteGif($id){
        $gif  = Gif::find($id);

        $gif->delete();

        return response()->json('success');
    }

    /**
     * updateGif
     *
     * - Parameter : request (infos gif à updater: name, color), id gif à updater
     * - Route : api/gif/{id}
     * - Method : PUT
     * - Response : infos gif updaté
    */
    public function updateGif(Request $request, $id){
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
