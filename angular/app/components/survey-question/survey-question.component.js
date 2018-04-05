class SurveyQuestionController{
    constructor ($scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API) {
        'ngInject'
        this.API = API
        this.$state = $state

        let SurveyQuestions = this.API.service('questions', this.API.all('surveys'))

        SurveyQuestions.getList()
          .then((response) => {
            let dataSet = response.plain()

            this.dtOptions = DTOptionsBuilder.newOptions()
              .withOption('data', dataSet)
              .withOption('createdRow', createdRow)
              .withOption('responsive', true)
              .withBootstrap()

            this.dtColumns = [
              DTColumnBuilder.newColumn('id').withTitle('ID'),
              DTColumnBuilder.newColumn('question_no').withTitle('Question No'),
              DTColumnBuilder.newColumn('question_body').withTitle('Body'),
              DTColumnBuilder.newColumn('type').withTitle('Type'),
              DTColumnBuilder.newColumn('survey_id').withTitle('Survey ID'),
              DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
                .renderWith(actionsHtml)
            ]

            this.displayTable = true
          })

        let createdRow = (row) => {
          $compile(angular.element(row).contents())($scope)
        }

        let actionsHtml = (data) => {
          return `
                    <a class="btn btn-xs btn-warning" ui-sref="app.survey-question-edit({questionId: ${data.id}})">
                        <i class="fa fa-edit"></i>
                    </a>
                    &nbsp
                    <button class="btn btn-xs btn-danger" ng-click="vm.delete(${data.id})">
                        <i class="fa fa-trash-o"></i>
                    </button>`
        }
      }

      delete (questionId) {
        let API = this.API
        let $state = this.$state

        swal({
          title: 'Are you sure?',
          text: 'You will not be able to recover this data!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Yes, delete it!',
          closeOnConfirm: false,
          showLoaderOnConfirm: true,
          html: false
        }, function () {
          API.one('surveys').one('questions', questionId).remove()
            .then(() => {
              swal({
                title: 'Deleted!',
                text: 'Survey List has been deleted.',
                type: 'success',
                confirmButtonText: 'OK',
                closeOnConfirm: true
              }, function () {
                $state.reload()
              })
            })
        })
      }

      $onInit () {}
}

export const SurveyQuestionComponent = {
    templateUrl: './views/app/components/survey-question/survey-question.component.html',
    controller: SurveyQuestionController,
    controllerAs: 'vm',
    bindings: {}
}
