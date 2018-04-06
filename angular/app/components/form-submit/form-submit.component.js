class FormSubmitController{
    constructor($stateParams, $state, $http, API){
        'ngInject';

        //
        this.$state = $state
        this.$http = $http
        this.formSubmitted = false
        this.alerts = []

        this.fromPhone = '+16042293732';
        this.surveys = {
            'list' : [],
            'questions': [],
            'selected': null
        }
        this.jsonPayload = {};
        this.surveyType = {
            'list' : [
                {
                    'id': 'voice',
                    'title': 'Voice'
                },
                {
                    'id': 'sms',
                    'title': 'SMS'
                }
            ],
            'selected': null
        }

        this.customers = {
            'list' : [],
            'selected': null
        }

        this.voiceType = {
            'list' : [
                {id: 'twilio', title: 'twilio'},
                {id: 'Geraint', title: 'Geraint'},
                {id: 'Gwyneth', title: 'Gwyneth'},
                {id: 'Mads', title: 'Mads'},
                {id: 'Naja', title: 'Naja'},
                {id: 'Hans', title: 'Hans'},
                {id: 'Marlene', title: 'Marlene'},
                {id: 'Nicole', title: 'Nicole'},
                {id: 'Russell', title: 'Russell'},
                {id: 'Amy', title: 'Amy'},
                {id: 'Brian', title: 'Brian'},
                {id: 'Emma', title: 'Emma'},
                {id: 'Raveena', title: 'Raveena'},
                {id: 'Ivy', title: 'Ivy'},
                {id: 'Joanna', title: 'Joanna'},
                {id: 'Joey', title: 'Joey'},
                {id: 'Justin', title: 'Justin'},
                {id: 'Kendra', title: 'Kendra'},
                {id: 'Kimberly', title: 'Kimberly'},
                {id: 'Matthew', title: 'Matthew'},
                {id: 'Salli', title: 'Salli'},
                {id: 'Conchita', title: 'Conchita'},
                {id: 'Enrique', title: 'Enrique'},
                {id: 'Miguel', title: 'Miguel'},
                {id: 'Penelope', title: 'Penelope'},
                {id: 'Chantal', title: 'Chantal'},
                {id: 'Celine', title: 'Celine'},
                {id: 'Mathieu', title: 'Mathieu'},
                {id: 'Dora', title: 'Dora'},
                {id: 'Karl', title: 'Karl'},
                {id: 'Carla', title: 'Carla'},
                {id: 'Giorgio', title: 'Giorgio'},
                {id: 'Mizuki', title: 'Mizuki'},
                {id: 'Liv', title: 'Liv'},
                {id: 'Lotte', title: 'Lotte'},
                {id: 'Ruben', title: 'Ruben'},
                {id: 'Ewa', title: 'Ewa'},
                {id: 'Jacek', title: 'Jacek'},
                {id: 'Jan', title: 'Jan'},
                {id: 'Maja', title: 'Maja'},
                {id: 'Ricardo', title: 'Ricardo'},
                {id: 'Vitoria', title: 'Vitoria'},
                {id: 'Cristiano', title: 'Cristiano'},
                {id: 'Ines', title: 'Ines'},
                {id: 'Carmen', title: 'Carmen'},
                {id: 'Maxim', title: 'Maxim'},
                {id: 'Tatyana', title: 'Tatyana'},
                {id: 'Astrid', title: 'Astrid'},
                {id: 'Filiz', title: 'Filiz'},
                {id: 'Vicki', title: 'Vicki'},
                {id: 'Takumi', title: 'Takumi'},
                {id: 'Seoyeon', title: 'Seoyeon'},
                {id: 'Aditi', titie: 'Aditi'}
            ],
            'selected': null
        }

        if ($stateParams.alerts) {
          this.alerts.push($stateParams.alerts)
        }

        this.surveyRoute = API.all('surveys');
        this.customerRoute = API.all('customers');
    }
    getSurveyList(){
        this.surveyRoute.get('lists').then((response) => {
            var survey_list = response.plain().data.lists
            this.surveys.list = survey_list;
            this.surveys.selected = this.surveys.list[0].id;
            this.surveyType.selected = this.surveyType.list[0].id;
            this.getSurveyQuestions();
        })
    }

    getCustomerList(){
        this.customerRoute.getList().then((response) => {
            var customer_list = response.plain()
            this.customers.list = customer_list;
            this.customers.selected = this.customers.list[0].id;
            this.voiceType.selected = 'Amy';
        })
    }
    getSurveyQuestions(){      
        var param = {
            id: this.surveys.selected
        }

        this.surveyRoute.all('question-list').post(param).then((response) => {
            var survey_questions = response.plain().data
            this.surveys.questions = survey_questions.map(function(item){
                return {body: item.question_body, type: item.type}
            });
        })
    }
    getCurrentDate(){
        var d = new Date,
        dformat = d.getFullYear() + "-" + 
                ("00" + (d.getMonth() + 1)).slice(-2) + "-" + 
                ("00" + d.getDate()).slice(-2) + " " + 
                ("00" + d.getHours()).slice(-2) + ":" + 
                ("00" + d.getMinutes()).slice(-2) + ":" + 
                ("00" + d.getSeconds()).slice(-2);
        return dformat;
    }
    submit (isValid, apiForm) {
        if (isValid) {
            let $state = this.$state
            let $http = this.$http
            let that = this;
            
            var survey = this.surveys.list.find(function(item){
                return item.id == that.surveys.selected;
            })

            var customer = this.customers.list.find(function(item){
                return item.id == that.customers.selected;
            })
            this.jsonPayload = {
                "_from": this.fromPhone,
                "_to": customer.phone,
                "call_datetime": this.getCurrentDate(),
                "customer_id": customer.id,
                "customer_name" : customer.name,
                "survey": {
                    "id": survey.id,
                    "title": survey.title,
                    "type": this.surveyType.selected,
                    "questions": this.surveys.questions
                },
                "voice_type": this.voiceType.selected
            }

            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }

            var api_url = "http://ec2-54-86-148-158.compute-1.amazonaws.com:9001/start_call";
            if(this.surveyType.selected != 'voice')
                api_url = "http://ec2-54-86-148-158.compute-1.amazonaws.com:9001/start_sms";

            swal({
              title: 'Are you sure?',
              text: JSON.stringify(this.jsonPayload),
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#DD6B55',
              confirmButtonText: 'Yes, submit it!',
              closeOnConfirm: false,
              showLoaderOnConfirm: true,
              html: false
            }, function () {
                $http({
                    method: "POST",
                    url: api_url,
                    dataType: 'json',
                    data: this.jsonPayload,
                    headers: { 
                        'Access-Control-Allow-Origin' : '*',
                        'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                })
                .success(function (data, status) {
                    swal({
                        title: 'Success!',
                        text: 'Api is called successfully.',
                        type: 'success',
                        confirmButtonText: 'OK',
                        closeOnConfirm: true
                      }, function () {
                        $state.reload()
                      })
                })
                .error(function (data, status) {
                    swal({
                        title: 'Error!',
                        text: 'Api call failed.',
                        type: 'error',
                        confirmButtonText: 'OK',
                        closeOnConfirm: true
                      }, function () {
                        $state.reload()
                      })
                });
            })

        } else {
            this.formSubmitted = true
        }
      }

    $onInit(){
        this.getSurveyList();
        this.getCustomerList();
    }
}

export const FormSubmitComponent = {
    templateUrl: './views/app/components/form-submit/form-submit.component.html',
    controller: FormSubmitController,
    controllerAs: 'vm',
    bindings: {}
}
