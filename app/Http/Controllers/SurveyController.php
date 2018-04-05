<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Models\SurveyList;
use App\Models\SurveyQuestion;
use App\Models\SurveyFeedback;
use App\Models\SurveyTranscript;
use Input;
use Validator;

class SurveyController extends Controller
{
    /**
     * Get all Survey Lists
     *
     * @return JSON
     */
    public function getLists(){
        $lists = SurveyList::all();
        return response()->success(compact('lists'));
    }

    /**
     * Get Survey List details referenced by id.
     *
     * @param int Role ID
     *
     * @return JSON
     */
    public function getListsShow($id)
    {
        $survey_list = SurveyList::find($id);
        return response()->success($survey_list);
    }

    /**
     * Update Survey List data and assign permission.
     *
     * @return JSON success message
     */
    public function putListsShow()
    {
        $surveyForm = Input::get('data');
        $surveyData = [
            'title' => $surveyForm['title'],
            'questions' => $surveyForm['questions'],
        ];

        $affectedRows = SurveyList::where('id', '=', intval($surveyForm['id']))->update($surveyData);

        return response()->success('success');
    }

    /**
     * Create new Survey List
     *
     * @return JSON
     */
    public function postLists()
    {
        $survey_list = SurveyList::create([
            'title' => Input::get('title'),
            'questions' => Input::get('questions'),
        ]);

        return response()->success(compact('survey_list'));
    }

    /**
     * Delete Survey List referenced by id.
     *
     * @param int Survey List ID
     *
     * @return JSON
     */
    public function deleteLists($id)
    {
        SurveyList::destroy($id);

        return response()->success('success');
    }

    /**
     * Get all Survey Questions
     *
     * @return JSON
     */
    public function getQuestions(){
        $questions = SurveyQuestion::all();
        return response()->success(compact('questions'));
    }

    /**
     * Get Survey Question details referenced by id.
     *
     * @param int Role ID
     *
     * @return JSON
     */
    public function getQuestionsShow($id)
    {
        $survey_question = SurveyQuestion::find($id);
        return response()->success($survey_question);
    }

    /**
     * Update Survey Question data and assign permission.
     *
     * @return JSON success message
     */
    public function putQuestionsShow()
    {
        $surveyForm = Input::get('data');
        $surveyData = [
            'question_no' => $surveyForm['question_no'],
            'question_body' => $surveyForm['question_body'],
            'type' => $surveyForm['type'],
            'survey_id' => $surveyForm['survey_id'],
        ];

        $affectedRows = SurveyQuestion::where('id', '=', intval($surveyForm['id']))->update($surveyData);

        return response()->success('success');
    }

    /**
     * Create new Survey Question
     *
     * @return JSON
     */
    public function postQuestions()
    {
        $survey_question = SurveyQuestion::create([
            'question_no' => Input::get('question_no'),
            'question_body' => Input::get('question_body'),
            'type' => Input::get('type'),
            'survey_id' => Input::get('survey_id'),
        ]);

        return response()->success(compact('survey_question'));
    }

    /**
     * Delete Survey Question referenced by id.
     *
     * @param int Survey List ID
     *
     * @return JSON
     */
    public function deleteQuestions($id)
    {
        SurveyQuestion::destroy($id);

        return response()->success('success');
    }

    public function postQuestionList(Request $request){
        $survey_id = $request['id'];
        $questions = SurveyQuestion::where(['survey_id'=>$survey_id])->orderBy('question_no','asc')->get();
        return response()->success($questions);        
    }

    public function getFeedbacks(){
        $feedback_list = SurveyFeedback::orderBy('survey_id','asc')->get();
        return response()->success($feedback_list);        
    }

    public function getTranscripts(){
        $transcript_list = SurveyTranscript::orderBy('call_id','asc')->get();
        return response()->success($transcript_list);        
    }
}
