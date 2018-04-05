<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\SurveyQuestion;

class SurveyList extends Model
{
    protected $table = 'survey_list';

    public $timestamps = false;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id', 'title', 'questions'
    ];

    public function questions(){
        return $this->hasMany(SurveyQuestion::class,'survey_id');
    }
}
