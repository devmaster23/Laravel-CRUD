class CustomerAddController{
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
        let Customer = this.API.service('customers')
        let $state = this.$state

        Customer.post({
          'name': this.name,
          'lastname': this.lastname,
          'date_of_birth': this.date_of_birth,
          'subscription_start_date': this.subscription_start_date,
          'phone': this.phone
        }).then(function () {
          let alert = { type: 'success', 'title': 'Success!', msg: 'Customer has been added.' }
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

export const CustomerAddComponent = {
    templateUrl: './views/app/components/customer-add/customer-add.component.html',
    controller: CustomerAddController,
    controllerAs: 'vm',
    bindings: {}
}
