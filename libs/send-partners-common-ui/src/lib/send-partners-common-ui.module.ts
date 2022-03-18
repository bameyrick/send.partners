import { NgModule } from '@angular/core';
import { ButtonComponent } from './components';
import { IconModule } from './icon/icon.module';

const imports = [IconModule];
const declarations = [ButtonComponent];
@NgModule({
  imports,
  declarations,
  exports: [...imports, ...declarations],
})
export class SendPartnersCommonUiModule {}
