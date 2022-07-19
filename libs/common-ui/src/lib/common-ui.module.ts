import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ButtonComponent } from './components';
import { IconModule } from './icon/icon.module';
import { TextInputComponent } from './components/text-input/text-input.component';
import { FormComponent } from './components/form/form.component';
import { FieldComponent } from './components/field/field.component';
import { PanelComponent } from './components/panel/panel.component';
import { LoginComponent } from './components/login/login.component';
import { PasswordStrengthComponent } from './components/password-strength/password-strength.component';
import { TranslateModule } from './translate/translate.module';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { OptionComponent } from './components/option/option.component';
import { LanguagesComponent } from './components/languages/languages.component';
import { RequestPasswordResetComponent } from './components/request-password-reset/request-password-reset.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';

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
    RequestPasswordResetComponent,
    PasswordResetComponent,
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
    RequestPasswordResetComponent,
    PasswordResetComponent,
  ],
})
export class CommonUiModule {}
