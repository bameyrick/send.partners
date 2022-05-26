import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SendPartnersCommonUiModule } from '@send.partners/send-partners-common-ui';
import { EmailVerificationComponent } from './components';

const imports = [RouterModule, SendPartnersCommonUiModule];

@NgModule({
  imports,
  declarations: [EmailVerificationComponent],
  exports: [...imports, EmailVerificationComponent],
})
export class AppCommonModule {}
