import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  ButtonComponent,
  CheckboxComponent,
  DropdownComponent,
  FieldComponent,
  FormComponent,
  LanguagesComponent,
  NumberInputComponent,
  OptionComponent,
  PanelComponent,
  PasswordStrengthComponent,
  TextInputComponent,
} from './components';
import { EmailVerificationComponent, LoginComponent } from './forms';
import { IconModule } from './icon';
import { TranslateModule } from './translate';
import { KeysPipe, ReversePipe, ValuesPipe } from './pipes';
import { HasAuthorityDirective } from './directives';

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
    CheckboxComponent,
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
    ReversePipe,
    ValuesPipe,
    NumberInputComponent,
    KeysPipe,
    HasAuthorityDirective,
  ],
  exports: [
    ...imports,
    ButtonComponent,
    CheckboxComponent,
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
    ReversePipe,
    ValuesPipe,
    NumberInputComponent,
    KeysPipe,
    HasAuthorityDirective,
  ],
})
export class CommonUiModule {}
