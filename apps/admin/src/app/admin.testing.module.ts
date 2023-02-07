import { NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { APP_ROUTING_TREE, ROOT_REDUCERS } from '@common-ui';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CommonUiTestingModule } from '../../../../libs/common-ui/src/lib/common-ui-testing.module';
import { AppPath, Authority } from '@common';

const imports = [CommonUiTestingModule, RouterTestingModule];

@NgModule({
  imports: [...imports, StoreModule.forRoot(ROOT_REDUCERS), EffectsModule.forRoot([])],
  exports: [...imports],
  providers: [
    {
      provide: APP_ROUTING_TREE,
      useValue: [
        {
          path: AppPath.Root,
        },
        {
          path: AppPath.Login,
        },
        {
          path: AppPath.Users,
          authority: Authority.ManageUsers,
          children: [
            {
              path: AppPath.CreateUser,
              authority: Authority.CreateUsers,
            },
          ],
        },
      ],
    },
  ],
})
export class AdminTestingModule {}
