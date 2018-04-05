class SurveyFeedbackController{
    constructor($scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API){
    'ngInject'
    this.API = API
    this.$state = $state

    let Survey = API.all('surveys');

    Survey.get('feedbacks')
      .then((response) => {
        let dataSet = response.plain().data

        this.dtOptions = DTOptionsBuilder.newOptions()
          .withOption('data', dataSet)
          .withOption('createdRow', createdRow)
          .withOption('responsive', true)
          .withBootstrap()

        this.dtColumns = [
          DTColumnBuilder.newColumn('call_datetime').withTitle('call_datetime'),
          DTColumnBuilder.newColumn('call_id').withTitle('call_id'),
          DTColumnBuilder.newColumn('customer_id').withTitle('customer_id'),
          DTColumnBuilder.newColumn('feedback').withTitle('feedback'),
          DTColumnBuilder.newColumn('question_body').withTitle('question_body'),
          DTColumnBuilder.newColumn('question_no').withTitle('question_no'),
          DTColumnBuilder.newColumn('question_type').withTitle('question_type'),
          DTColumnBuilder.newColumn('survey_id').withTitle('survey_id'),
          DTColumnBuilder.newColumn('survey_type').withTitle('survey_type'),
        ]

        this.displayTable = true
      })

    let createdRow = (row) => {
      $compile(angular.element(row).contents())($scope)
    }
  }
  $onInit () {}
}

export const SurveyFeedbackComponent = {
    templateUrl: './views/app/components/survey-feedback/survey-feedback.component.html',
    controller: SurveyFeedbackController,
    controllerAs: 'vm',
    bindings: {}
}
