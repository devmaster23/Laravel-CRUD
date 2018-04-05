import {CustomerEditComponent} from './app/components/customer-edit/customer-edit.component';
import {CustomerAddComponent} from './app/components/customer-add/customer-add.component';
import {CustomerComponent} from './app/components/customer/customer.component';
import {SurveyQuestionEditComponent} from './app/components/survey-question-edit/survey-question-edit.component';
import {SurveyQuestionAddComponent} from './app/components/survey-question-add/survey-question-add.component';
import {SurveyQuestionComponent} from './app/components/survey-question/survey-question.component';
import {SurveyListEditComponent} from './app/components/survey-list-edit/survey-list-edit.component';
import {SurveyListAddComponent} from './app/components/survey-list-add/survey-list-add.component';
import {SurveyListComponent} from './app/components/survey-list/survey-list.component';
import {SurveyTranscriptComponent} from './app/components/survey-transcript/survey-transcript.component';
import {SurveyFeedbackComponent} from './app/components/survey-feedback/survey-feedback.component';
import { UserProfileComponent } from './app/components/user-profile/user-profile.component'
import { UserVerificationComponent } from './app/components/user-verification/user-verification.component'
import { UserEditComponent } from './app/components/user-edit/user-edit.component'
import { UserPermissionsEditComponent } from './app/components/user-permissions-edit/user-permissions-edit.component'
import { UserPermissionsAddComponent } from './app/components/user-permissions-add/user-permissions-add.component'
import { UserPermissionsComponent } from './app/components/user-permissions/user-permissions.component'
import { UserRolesEditComponent } from './app/components/user-roles-edit/user-roles-edit.component'
import { UserRolesAddComponent } from './app/components/user-roles-add/user-roles-add.component'
import { UserRolesComponent } from './app/components/user-roles/user-roles.component'
import { UserListsComponent } from './app/components/user-lists/user-lists.component'
import { DashboardComponent } from './app/components/dashboard/dashboard.component'
import { NavSidebarComponent } from './app/components/nav-sidebar/nav-sidebar.component'
import { NavHeaderComponent } from './app/components/nav-header/nav-header.component'
import { LoginLoaderComponent } from './app/components/login-loader/login-loader.component'
import { ResetPasswordComponent } from './app/components/reset-password/reset-password.component'
import { ForgotPasswordComponent } from './app/components/forgot-password/forgot-password.component'
import { LoginFormComponent } from './app/components/login-form/login-form.component'
import { RegisterFormComponent } from './app/components/register-form/register-form.component'
import { FormSubmitComponent } from './app/components/form-submit/form-submit.component'

angular.module('app.components')
	.component('customerEdit', CustomerEditComponent)
	.component('customerAdd', CustomerAddComponent)
	.component('customer', CustomerComponent)
	.component('surveyQuestionEdit', SurveyQuestionEditComponent)
	.component('surveyQuestionAdd', SurveyQuestionAddComponent)
	.component('surveyQuestion', SurveyQuestionComponent)
	.component('surveyListEdit', SurveyListEditComponent)
	.component('surveyListAdd', SurveyListAddComponent)
	.component('surveyList', SurveyListComponent)
	.component('surveyTranscript', SurveyTranscriptComponent)
	.component('surveyFeedback', SurveyFeedbackComponent)
  .component('userProfile', UserProfileComponent)
  .component('userVerification', UserVerificationComponent)
  .component('userEdit', UserEditComponent)
  .component('userPermissionsEdit', UserPermissionsEditComponent)
  .component('userPermissionsAdd', UserPermissionsAddComponent)
  .component('userPermissions', UserPermissionsComponent)
  .component('userRolesEdit', UserRolesEditComponent)
  .component('userRolesAdd', UserRolesAddComponent)
  .component('userRoles', UserRolesComponent)
  .component('userLists', UserListsComponent)
  .component('dashboard', DashboardComponent)
  .component('navSidebar', NavSidebarComponent)
  .component('navHeader', NavHeaderComponent)
  .component('loginLoader', LoginLoaderComponent)
  .component('resetPassword', ResetPasswordComponent)
  .component('forgotPassword', ForgotPasswordComponent)
  .component('loginForm', LoginFormComponent)
  .component('registerForm', RegisterFormComponent)
  .component('formSubmit', FormSubmitComponent)