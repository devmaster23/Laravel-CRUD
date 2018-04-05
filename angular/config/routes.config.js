export function RoutesConfig ($stateProvider, $urlRouterProvider) {
  'ngInject'

  var getView = (viewName) => {
    return `./views/app/pages/${viewName}/${viewName}.page.html`
  }

  var getLayout = (layout) => {
    return `./views/app/pages/layout/${layout}.page.html`
  }

  $urlRouterProvider.otherwise('/')

  $stateProvider
    .state('app', {
      abstract: true,
      views: {
        'layout': {
          templateUrl: getLayout('layout')
        },
        'header@app': {
          templateUrl: getView('header')
        },
        'footer@app': {
          templateUrl: getView('footer')
        },
        main: {}
      },
      data: {
        bodyClass: 'hold-transition skin-blue sidebar-mini'
      }
    })
    .state('app.landing', {
      url: '/',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          templateUrl: getView('landing')
        }
      }
    })
    .state('app.profile', {
      url: '/profile',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-profile></user-profile>'
        }
      },
      params: {
        alerts: null
      }
    })
    .state('app.submit', {
      url: '/form-submit',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<form-submit></form-submit>'
        }
      }
    })
    .state('app.survey-feedback', {
      url: '/survey-feedback',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<survey-feedback></survey-feedback>'
        }
      }
    })
    .state('app.survey-transcript', {
      url: '/survey-transcript',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<survey-transcript></survey-transcript>'
        }
      }
    })
    .state('app.survey-list', {
      url: '/survey-list',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<survey-list></survey-list>'
        }
      }
    })
    .state('app.survey-list-add', {
      url: '/survey-list-add',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<survey-list-add></survey-list-add>'
        }
      },
      params: {
        alerts: null
      }
    })
    .state('app.survey-list-edit', {
      url: '/survey-list-edit/:listId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<survey-list-edit></survey-list-edit>'
        }
      },
      params: {
        alerts: null,
        listId: null
      }
    })
    .state('app.survey-question', {
      url: '/survey-question',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<survey-question></survey-question>'
        }
      }
    })
    .state('app.survey-question-add', {
      url: '/survey-question-add',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<survey-question-add></survey-question-add>'
        }
      },
      params: {
        alerts: null
      }
    })
    .state('app.survey-question-edit', {
      url: '/survey-question-edit/:questionId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<survey-question-edit></survey-question-edit>'
        }
      },
      params: {
        alerts: null,
        questionId: null
      }
    })
    .state('app.customer', {
      url: '/customer',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<customer></customer>'
        }
      }
    })
    .state('app.customer-add', {
      url: '/customer-add',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<customer-add></customer-add>'
        }
      },
      params: {
        alerts: null
      }
    })
    .state('app.customer-edit', {
      url: '/customer-edit/:customerId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<customer-edit></customer-edit>'
        }
      },
      params: {
        alerts: null,
        customerId: null
      }
    })
    .state('app.userlist', {
      url: '/user-lists',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-lists></user-lists>'
        }
      }
    })
    .state('app.useredit', {
      url: '/user-edit/:userId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-edit></user-edit>'
        }
      },
      params: {
        alerts: null,
        userId: null
      }
    })
    .state('app.userroles', {
      url: '/user-roles',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-roles></user-roles>'
        }
      }
    })
    .state('app.userpermissions', {
      url: '/user-permissions',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-permissions></user-permissions>'
        }
      }
    })
    .state('app.userpermissionsadd', {
      url: '/user-permissions-add',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-permissions-add></user-permissions-add>'
        }
      },
      params: {
        alerts: null
      }
    })
    .state('app.userpermissionsedit', {
      url: '/user-permissions-edit/:permissionId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-permissions-edit></user-permissions-edit>'
        }
      },
      params: {
        alerts: null,
        permissionId: null
      }
    })
    .state('app.userrolesadd', {
      url: '/user-roles-add',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-roles-add></user-roles-add>'
        }
      },
      params: {
        alerts: null
      }
    })
    .state('app.userrolesedit', {
      url: '/user-roles-edit/:roleId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-roles-edit></user-roles-edit>'
        }
      },
      params: {
        alerts: null,
        roleId: null
      }
    })
    .state('login', {
      url: '/login',
      views: {
        'layout': {
          templateUrl: getView('login')
        },
        'header@app': {},
        'footer@app': {}
      },
      data: {
        bodyClass: 'hold-transition login-page'
      },
      params: {
        registerSuccess: null,
        successMsg: null
      }
    })
    .state('loginloader', {
      url: '/login-loader',
      views: {
        'layout': {
          templateUrl: getView('login-loader')
        },
        'header@app': {},
        'footer@app': {}
      },
      data: {
        bodyClass: 'hold-transition login-page'
      }
    })
    .state('register', {
      url: '/register',
      views: {
        'layout': {
          templateUrl: getView('register')
        },
        'header@app': {},
        'footer@app': {}
      },
      data: {
        bodyClass: 'hold-transition register-page'
      }
    })
    .state('userverification', {
      url: '/userverification/:status',
      views: {
        'layout': {
          templateUrl: getView('user-verification')
        }
      },
      data: {
        bodyClass: 'hold-transition login-page'
      },
      params: {
        status: null
      }
    })
    .state('forgot_password', {
      url: '/forgot-password',
      views: {
        'layout': {
          templateUrl: getView('forgot-password')
        },
        'header@app': {},
        'footer@app': {}
      },
      data: {
        bodyClass: 'hold-transition login-page'
      }
    })
    .state('reset_password', {
      url: '/reset-password/:email/:token',
      views: {
        'layout': {
          templateUrl: getView('reset-password')
        },
        'header@app': {},
        'footer@app': {}
      },
      data: {
        bodyClass: 'hold-transition login-page'
      }
    })
    .state('app.logout', {
      url: '/logout',
      views: {
        'main@app': {
          controller: function ($rootScope, $scope, $auth, $state, AclService) {
            $auth.logout().then(function () {
              delete $rootScope.me
              AclService.flushRoles()
              AclService.setAbilities({})
              $state.go('login')
            })
          }
        }
      }
    })
}
