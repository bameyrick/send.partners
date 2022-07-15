import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonUiModule } from '@app/common-ui';
import { EmailVerificationComponent } from './components';

const imports = [RouterModule, CommonUiModule];

@NgModule({
  imports,
  declarations: [EmailVerificationComponent],
  exports: [...imports, EmailVerificationComponent],
})
export class AppCommonModule {}
