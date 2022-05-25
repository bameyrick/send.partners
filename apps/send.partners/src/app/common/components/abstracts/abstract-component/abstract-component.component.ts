import { Component } from '@angular/core';
import { APIErrorCode, APIErrorCodeTranslation } from '@send.partners/common';
import { AbstractComponent } from '@send.partners/send-partners-common-ui';
import { AppPath } from '../../../../routing/app-path';

@Component({
  template: '',
})
export abstract class AppAbstractComponent extends AbstractComponent {
  public readonly AppPath = AppPath;

  public readonly APIErrorCode = APIErrorCode;
  public readonly APIErrorCodeTranslation = APIErrorCodeTranslation;
}
