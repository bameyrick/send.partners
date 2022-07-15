import { Directive } from '@angular/core';
import { APIErrorCode, APIErrorCodeTranslation } from '@app/common';
import { AbstractComponent } from '@app/common-ui';
import { AppPath } from '../../../../routing/app-path';

@Directive()
export abstract class AppAbstractComponent extends AbstractComponent {
  public readonly AppPath = AppPath;

  public readonly APIErrorCode = APIErrorCode;
  public readonly APIErrorCodeTranslation = APIErrorCodeTranslation;
}
