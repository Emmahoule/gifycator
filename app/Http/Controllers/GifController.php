<?php

namespace App\Http\Controllers;

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

    public function saveGif(Request $request){

        $gif = Gif::create($request->all());

        return response()->json($gif);

    }

    public function deleteGif($id){
        $gif  = Gif::find($id);

        $gif->delete();

        return response()->json('success');
    }

    public function updateGif(Request $request,$id){
        $gif  = Gif::find($id);

        $gif->url = $request->input('url');
        $gif->title = $request->input('title');
        $gif->author = $request->input('author');
        $gif->published = $request->input('published');
        $gif->category = $request->input('category');

        $gif->save();

        return response()->json($gif);
    }

}