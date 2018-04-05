class SurveyListEditController{
    constructor ($stateParams, $state, API) {
        'ngInject'

        this.$state = $state
        this.formSubmitted = false
        this.alerts = []

        if ($stateParams.alerts) {
          this.alerts.push($stateParams.alerts)
        }

        let listId = $stateParams.listId
        let SurveyList = API.service('lists-show', API.all('surveys'))
        SurveyList.one(listId).get()
          .then((response) => {
            this.role = API.copy(response)
          })
      }

      save (isValid) {
        if (isValid) {
          let $state = this.$state
          this.role.put()
            .then(() => {
              let alert = { type: 'success', 'title': 'Success!', msg: 'List has been updated.' }
              $state.go($state.current, { alerts: alert})
            }, (response) => {
              let alert = { type: 'error', 'title': 'Error!', msg: response.data.message }
              $state.go($state.current, { alerts: alert})
            })
        } else {
          this.formSubmitted = true
        }
      }

      $onInit () {}
}

export const SurveyListEditComponent = {
    templateUrl: './views/app/components/survey-list-edit/survey-list-edit.component.html',
    controller: SurveyListEditController,
    controllerAs: 'vm',
    bindings: {}
}
