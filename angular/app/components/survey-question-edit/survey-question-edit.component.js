class SurveyQuestionEditController{
    constructor ($stateParams, $state, API) {
        'ngInject'

        this.$state = $state
        this.API = API
        this.formSubmitted = false
        this.alerts = []

        this.question_type_list = [
          {value: 'text', title: 'Text'},
          {value: 'boolean', title: 'Boolean'},
          {value: 'numeric', title: 'Numeric'},
        ]

        this.survey_id_list = [];

        if ($stateParams.alerts) {
          this.alerts.push($stateParams.alerts)
        }

        let questionId = $stateParams.questionId
        let SurveyQuestion = API.service('questions-show', API.all('surveys'))
        SurveyQuestion.one(questionId).get()
          .then((response) => {
            this.question = API.copy(response)
          })
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
        if (isValid) {
          let $state = this.$state
          this.question.put()
            .then(() => {
              let alert = { type: 'success', 'title': 'Success!', msg: 'Question has been updated.' }
              $state.go($state.current, { alerts: alert})
            }, (response) => {
              let alert = { type: 'error', 'title': 'Error!', msg: response.data.message }
              $state.go($state.current, { alerts: alert})
            })
        } else {
          this.formSubmitted = true
        }
      }

      $onInit () {
        this.getSurveyList();
      }
}

export const SurveyQuestionEditComponent = {
    templateUrl: './views/app/components/survey-question-edit/survey-question-edit.component.html',
    controller: SurveyQuestionEditController,
    controllerAs: 'vm',
    bindings: {}
}
