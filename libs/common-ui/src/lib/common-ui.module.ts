import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthModule } from './auth';

import {
  ButtonComponent,
  DropdownComponent,
  EmailVerificationComponent,
  FieldComponent,
  FormComponent,
  LanguagesComponent,
  OptionComponent,
  PanelComponent,
  PasswordStrengthComponent,
  TextInputComponent,
} from './components';
import { LoginComponent, ResetPasswordComponent, RequestPasswordResetComponent, RequestPasswordResetSuccessComponent } from './forms';
import { IconModule } from './icon';
import { TranslateModule } from './translate';

const imports = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  IconModule,
  TranslateModule,
  OverlayModule,
  RouterModule,
  AuthModule,
];

@NgModule({
  imports,
  declarations: [
    ButtonComponent,
    TextInputComponent,
    FormComponent,
    FieldComponent,
    PanelComponent,
    LoginComponent,
    PasswordStrengthComponent,
    DropdownComponent,
    OptionComponent,
    LanguagesComponent,
    EmailVerificationComponent,
    RequestPasswordResetComponent,
    RequestPasswordResetSuccessComponent,
    ResetPasswordComponent,
  ],
  exports: [
    ...imports,
    ButtonComponent,
    TextInputComponent,
    FormComponent,
    FieldComponent,
    PanelComponent,
    LoginComponent,
    PasswordStrengthComponent,
    DropdownComponent,
    OptionComponent,
    LanguagesComponent,
    EmailVerificationComponent,
    RequestPasswordResetComponent,
    RequestPasswordResetSuccessComponent,
    ResetPasswordComponent,
  ],
})
export class CommonUiModule {}
