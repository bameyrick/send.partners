import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonComponent } from './components';
import { IconModule } from './icon/icon.module';
import { TextInputComponent } from './components/text-input/text-input.component';

const imports = [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, IconModule];
@NgModule({
  imports,
  declarations: [ButtonComponent, TextInputComponent],
  exports: [...imports, ButtonComponent, TextInputComponent],
})
export class SendPartnersCommonUiModule {}
