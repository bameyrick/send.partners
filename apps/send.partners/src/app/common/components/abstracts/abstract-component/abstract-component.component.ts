import { Directive } from '@angular/core';
import { APIErrorCode, APIErrorCodeTranslation } from '@send.partners/common';
import { AbstractComponent } from '@send.partners/send-partners-common-ui';
import { AppPath } from '../../../../routing/app-path';

@Directive()
export abstract class AppAbstractComponent extends AbstractComponent {
  public readonly AppPath = AppPath;

  public readonly APIErrorCode = APIErrorCode;
  public readonly APIErrorCodeTranslation = APIErrorCodeTranslation;
}
