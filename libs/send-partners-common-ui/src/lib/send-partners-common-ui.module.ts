import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonComponent } from './components';
import { IconModule } from './icon/icon.module';
import { TextInputComponent } from './components/text-input/text-input.component';
import { FormComponent } from './components/form/form.component';
import { LoginComponent } from './components/login/login.component';

const imports = [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, IconModule];
@NgModule({
  imports,
  declarations: [ButtonComponent, TextInputComponent, FormComponent, LoginComponent],
  exports: [...imports, ButtonComponent, TextInputComponent, FormComponent, LoginComponent],
})
export class SendPartnersCommonUiModule {}
