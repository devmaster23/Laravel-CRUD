class CustomerEditController{
    constructor ($stateParams, $state, API) {
        'ngInject'

        this.$state = $state
        this.formSubmitted = false
        this.alerts = []

        if ($stateParams.alerts) {
          this.alerts.push($stateParams.alerts)
        }

        let customerId = $stateParams.customerId
        let Customer = API.service('show', API.all('customers'))
        Customer.one(customerId).get()
          .then((response) => {
            this.customer = API.copy(response)
            this.customer.data.date_of_birth = new Date(this.customer.data.date_of_birth)
            this.customer.data.subscription_start_date = new Date(this.customer.data.subscription_start_date)
          })
      }

      save (isValid) {
        if (isValid) {
          let $state = this.$state
          this.customer.put()
            .then(() => {
              let alert = { type: 'success', 'title': 'Success!', msg: 'Permission has been updated.' }
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

export const CustomerEditComponent = {
    templateUrl: './views/app/components/customer-edit/customer-edit.component.html',
    controller: CustomerEditController,
    controllerAs: 'vm',
    bindings: {}
}
