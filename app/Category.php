<?php namespace App;
 
 use Illuminate\Database\Eloquent\Model;
 
/**
 * Category
 * 
 * Modèle Category
*/
 class Category extends Model
 {
    protected $table = 'categories';
    public $timestamps = false;

    public function gifs() 
	{
	    return $this->hasMany('App\Gif');
	}

	protected $fillable = ['name', 'color'];

 }
 