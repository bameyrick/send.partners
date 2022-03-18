import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './components';
import { IconModule } from './icon/icon.module';

@NgModule({
  imports: [HttpClientModule, IconModule],
  declarations: [ButtonComponent],
  exports: [IconModule],
})
export class SendPartnersCommonUiModule {}
