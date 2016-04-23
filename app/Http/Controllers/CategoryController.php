<?php

namespace App\Http\Controllers;

use App\Category;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

/**
 * CategoryController
 * 
 * Controller qui gère toutes les requêtes 
 * relatives aux catégories
*/
class CategoryController extends Controller{

    /**
     * index
     *
     * - Parameter : no
     * - Route : api/category
     * - Method : GET
     * - Response : liste catégories
    */
    public function index(){

        $categories  = Category::all();

        return response()->json($categories);

    }

    /**
     * getCategory
     *
     * - Parameter : id catégorie à lire
     * - Route : api/category/{id}
     * - Method : GET
     * - Response : infos catégorie
    */
    public function getCategory($id){

        $category  = Category::find($id);

        return response()->json($category);
    }

    /**
     * saveCategory
     *
     * - Parameter : requette (infos catégorie à créer : name, color)
     * - Route : api/category
     * - Method : POST
     * - Response : infos catégorie créée
    */
    public function saveCategory(Request $request){

        $category = Category::create($request->all());

        return response()->json($category);

    }

    /**
     * deleteCategory
     *
     * - Parameter : id catégorie à supprimer
     * - Route : api/category/{id}
     * - Method : DELETE
     * - Response : infos catégorie supprimée
    */
    public function deleteCategory($id){
        $category  = Category::find($id);

        $category->delete();

        return response()->json('success');
    }

    /**
     * updateCategory
     *
     * - Parameter : request (infos catégorie à updater: name, color), id categorie à updater
     * - Route : api/category/{id}
     * - Method : PUT
     * - Response : infos catégorie updatée
    */
    public function updateCategory(Request $request, $id){
        $category  = Category::find($id);

        $category->name = $request->input('name');
        $category->name = $request->input('color');
        $category->save();

        return response()->json($category);
    }

}