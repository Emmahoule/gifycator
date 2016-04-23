<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Gif
 * 
 * Modèle Gif
*/
class Gif extends Model
{
    protected $table = 'gifs';
    public $timestamps = false;

    public function category() 
	{
		return $this->belongsTo('App\Category');
	}

	protected $fillable = ['url', 'cover', 'title','author', 'published', 'category'];
}
