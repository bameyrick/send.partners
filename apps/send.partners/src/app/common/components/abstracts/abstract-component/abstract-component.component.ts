import { Component } from '@angular/core';
import { AbstractComponent } from '@send.partners/send-partners-common-ui';
import { AppPath } from 'apps/send.partners/src/app/routing';

@Component({
  template: '',
})
export abstract class AppAbstractComponent extends AbstractComponent {
  public readonly AppPath = AppPath;
}
