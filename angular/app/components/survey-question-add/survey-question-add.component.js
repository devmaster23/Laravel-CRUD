class SurveyQuestionAddController{
    constructor (API, $state, $stateParams) {
      'ngInject'

      this.$state = $state
      this.formSubmitted = false
      this.API = API
      this.alerts = []

      this.question_type_list = [
        {value: 'text', title: 'Text'},
        {value: 'boolean', title: 'Boolean'},
        {value: 'numeric', title: 'Numeric'},
      ]
      this.question_type = 'text';

      this.survey_id_list = [];
      if ($stateParams.alerts) {
        this.alerts.push($stateParams.alerts)
      }
    }

    getSurveyList(){
        let SurveyLists = this.API.service('lists', this.API.all('surveys'))
        let that = this
        SurveyLists.getList()
          .then((response) => {
            let dataSet = response.plain();
            that.survey_id_list = dataSet.map(function(item){
                return {id: item.id, title: item.title}
            })
          })
    }
    save (isValid) {
      this.$state.go(this.$state.current, {}, { alerts: 'test' })
      if (isValid) {
        let SurveyQuestions = this.API.service('questions', this.API.all('surveys'))
        let $state = this.$state

        if(this.survey_id == undefined)
        {
          let alert = { type: 'error', 'title': 'Error!', msg: 'Survey Id is required' }
          $state.go($state.current, { alerts: alert})
        }else{
            SurveyQuestions.post({
              'question_no': this.question_no,
              'question_body': this.question_body,
              'type': this.question_type,
              'survey_id': this.survey_id,
            }).then(function () {
              let alert = { type: 'success', 'title': 'Success!', msg: 'List has been added.' }
              $state.go($state.current, { alerts: alert})
            }, function (response) {
              let alert = { type: 'error', 'title': 'Error!', msg: response.data.message }
              $state.go($state.current, { alerts: alert})
            })
        }
      } else {
        this.formSubmitted = true
      }
    }

    $onInit () {
        this.getSurveyList();
    }
}

export const SurveyQuestionAddComponent = {
    templateUrl: './views/app/components/survey-question-add/survey-question-add.component.html',
    controller: SurveyQuestionAddController,
    controllerAs: 'vm',
    bindings: {}
}
