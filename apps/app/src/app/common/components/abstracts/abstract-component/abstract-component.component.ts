import { Directive } from '@angular/core';
import { APIErrorCode, APIErrorCodeTranslation, AppPath } from '@common';
import { AbstractComponent } from '@common-ui';

@Directive()
export abstract class AppAbstractComponent extends AbstractComponent {
  public readonly AppPath = AppPath;

  public readonly APIErrorCode = APIErrorCode;
  public readonly APIErrorCodeTranslation = APIErrorCodeTranslation;
}
