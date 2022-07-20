import { NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CommonUiTestingModule } from '../../../../libs/common-ui/src/lib/common-ui-testing.module';
import { ROOT_REDUCERS } from './routing';

const imports = [CommonUiTestingModule, RouterTestingModule];

@NgModule({
  imports: [...imports, StoreModule.forRoot(ROOT_REDUCERS), EffectsModule.forRoot([])],
  exports: [...imports],
})
export class AppTestingModule {}
