import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonUiModule } from '@common-ui';

const imports = [RouterModule, CommonUiModule];

@NgModule({
  imports,
  declarations: [],
  exports: [...imports],
})
export class AppCommonModule {}
