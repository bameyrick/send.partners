import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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

const imports = [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, IconModule, TranslateModule, OverlayModule];

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
  ],
})
export class SendPartnersCommonUiModule {}
