import { NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { SendPartnersCommonUiTestingModule } from '../../../../libs/send-partners-common-ui/src/lib/send-partners-common-ui-testing.module';
import { ROOT_REDUCERS } from './routing';
import { AuthModule } from './auth';

const imports = [SendPartnersCommonUiTestingModule, RouterTestingModule];

@NgModule({
  imports: [...imports, StoreModule.forRoot(ROOT_REDUCERS), EffectsModule.forRoot([]), AuthModule],
  exports: [...imports],
})
export class SendPartnersTestingModule {}
