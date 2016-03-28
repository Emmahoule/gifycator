<?php

namespace App\Http\Controllers;

use App\Category;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class CategoryController extends Controller{


    public function index(){

        $categories  = Category::all();

        return response()->json($categories);

    }

    public function getCategory($id){

        $category  = Category::find($id);

        return response()->json($category);
    }

    public function saveCategory(Request $request){

        $category = Category::create($request->all());

        return response()->json($category);

    }

    public function deleteCategory($id){
        $category  = Category::find($id);

        $category->delete();

        return response()->json('success');
    }

    public function updateCategory(Request $request,$id){
        $category  = Category::find($id);

        $category->name = $request->input('name');
        $category->name = $request->input('img');
        $category->name = $request->input('thumbnail');
        $category->save();

        return response()->json($category);
    }

}