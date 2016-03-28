<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$app->get('/', function () use ($app) {
    return $app->version();
});

$app->group(['prefix' => 'api/','namespace' => 'App\Http\Controllers'], function($app)
{
	// Category routes
    $app->get('category','CategoryController@index');
    $app->get('category/{id}','CategoryController@getCategory');
    $app->post('category','CategoryController@saveCategory');
    $app->put('category/{id}','CategoryController@updateCategory');
    $app->delete('category/{id}','CategoryController@deleteCategory');

    // Gif routes
    $app->get('gif','GifController@index');
    $app->get('gif/{id}','GifController@getGif');
    $app->get('gifs/{id}','GifController@getGifs');
    $app->post('gif','GifController@saveGif');
    $app->put('gif/{id}','GifController@updateGif');
    $app->delete('gif/{id}','GifController@deleteGif');

    // Convert route
    $app->post('to-webm','ToWebmController@convertVideo');

    // Download routes
    $app->post('download-file','DownloadController@downloadFile');

    // Create Story routes
    $app->post('create-story','CreateStoryController@createStory');

});



