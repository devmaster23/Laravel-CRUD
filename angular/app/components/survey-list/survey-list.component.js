class SurveyListController{
    constructor ($scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API) {
        'ngInject'
        this.API = API
        this.$state = $state

        let SurveyLists = this.API.service('lists', this.API.all('surveys'))

        SurveyLists.getList()
          .then((response) => {
            let dataSet = response.plain()

            this.dtOptions = DTOptionsBuilder.newOptions()
              .withOption('data', dataSet)
              .withOption('createdRow', createdRow)
              .withOption('responsive', true)
              .withBootstrap()

            this.dtColumns = [
              DTColumnBuilder.newColumn('id').withTitle('ID'),
              DTColumnBuilder.newColumn('title').withTitle('Title'),
              DTColumnBuilder.newColumn('questions').withTitle('Questions'),
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
                    <a class="btn btn-xs btn-warning" ui-sref="app.survey-list-edit({listId: ${data.id}})">
                        <i class="fa fa-edit"></i>
                    </a>
                    &nbsp
                    <button class="btn btn-xs btn-danger" ng-click="vm.delete(${data.id})">
                        <i class="fa fa-trash-o"></i>
                    </button>`
        }
      }

      delete (listId) {
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
          API.one('surveys').one('lists', listId).remove()
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

export const SurveyListComponent = {
    templateUrl: './views/app/components/survey-list/survey-list.component.html',
    controller: SurveyListController,
    controllerAs: 'vm',
    bindings: {}
}
