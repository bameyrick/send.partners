import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  ButtonComponent,
  DropdownComponent,
  FieldComponent,
  FormComponent,
  LanguagesComponent,
  OptionComponent,
  PanelComponent,
  PasswordStrengthComponent,
  TextInputComponent,
} from './components';
import { EmailVerificationComponent, LoginComponent } from './forms';
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
  ],
})
export class CommonUiModule {}
