class SurveyListAddController{
    constructor (API, $state, $stateParams) {
      'ngInject'

      this.$state = $state
      this.formSubmitted = false
      this.API = API
      this.alerts = []

      if ($stateParams.alerts) {
        this.alerts.push($stateParams.alerts)
      }
    }

    save (isValid) {
      this.$state.go(this.$state.current, {}, { alerts: 'test' })
      if (isValid) {
        let SurveyList = this.API.service('lists', this.API.all('surveys'))
        let $state = this.$state

        SurveyList.post({
          'title': this.title,
          'questions': this.questions,
        }).then(function () {
          let alert = { type: 'success', 'title': 'Success!', msg: 'List has been added.' }
          $state.go($state.current, { alerts: alert})
        }, function (response) {
          let alert = { type: 'error', 'title': 'Error!', msg: response.data.message }
          $state.go($state.current, { alerts: alert})
        })
      } else {
        this.formSubmitted = true
      }
    }

    $onInit () {}
}

export const SurveyListAddComponent = {
    templateUrl: './views/app/components/survey-list-add/survey-list-add.component.html',
    controller: SurveyListAddController,
    controllerAs: 'vm',
    bindings: {}
}
