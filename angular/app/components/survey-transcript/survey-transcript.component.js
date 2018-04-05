class SurveyTranscriptController{
   constructor($scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API){
    'ngInject'
    this.API = API
    this.$state = $state

    let Survey = API.all('surveys');

    Survey.get('transcripts')
      .then((response) => {
        let dataSet = response.plain().data

        this.dtOptions = DTOptionsBuilder.newOptions()
          .withOption('data', dataSet)
          .withOption('createdRow', createdRow)
          .withOption('responsive', true)
          .withBootstrap()

        this.dtColumns = [
          DTColumnBuilder.newColumn('call_id').withTitle('call_id'),
          DTColumnBuilder.newColumn('question_no').withTitle('question_no'),
          DTColumnBuilder.newColumn('recording_url').withTitle('recording_url'),
          DTColumnBuilder.newColumn('transcription').withTitle('transcription'),
        ]

        this.displayTable = true
      })

    let createdRow = (row) => {
      $compile(angular.element(row).contents())($scope)
    }
  }
  $onInit () {}
}

export const SurveyTranscriptComponent = {
    templateUrl: './views/app/components/survey-transcript/survey-transcript.component.html',
    controller: SurveyTranscriptController,
    controllerAs: 'vm',
    bindings: {}
}
