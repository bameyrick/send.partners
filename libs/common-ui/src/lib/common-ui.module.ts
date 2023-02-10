import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  AvatarComponent,
  ButtonComponent,
  CheckboxComponent,
  DropdownComponent,
  FieldComponent,
  FormComponent,
  LanguagesComponent,
  NavigationComponent,
  NotificationCountComponent,
  NumberInputComponent,
  OptionComponent,
  PanelComponent,
  PasswordStrengthComponent,
  TextInputComponent,
  TotalGroupNotificationsPipe,
} from './components';
import { HasAuthorityDirective } from './directives';
import { EmailVerificationComponent, LoginComponent } from './forms';
import { IconModule } from './icon';
import { KeysPipe, ReversePipe, ValuesPipe } from './pipes';
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

const declarations = [
  AvatarComponent,
  ButtonComponent,
  CheckboxComponent,
  DropdownComponent,
  EmailVerificationComponent,
  FieldComponent,
  FormComponent,
  HasAuthorityDirective,
  LanguagesComponent,
  LoginComponent,
  KeysPipe,
  TextInputComponent,
  TotalGroupNotificationsPipe,
  NavigationComponent,
  NotificationCountComponent,
  NumberInputComponent,
  OptionComponent,
  PanelComponent,
  PasswordStrengthComponent,
  ReversePipe,
  ValuesPipe,
];

@NgModule({
  imports,
  declarations,
  exports: [...imports, ...declarations],
})
export class CommonUiModule {}
