import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { isNullOrUndefined } from '@qntm-code/utils';
import { AbstractComponent } from '../abstracts';

@Component({
  selector: 'notification-count',
  templateUrl: './notification-count.component.html',
  styleUrls: ['./notification-count.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NotificationCountComponent extends AbstractComponent {
  /**
   * The BEM block name class
   */
  public readonly bemBlockClass: string = 'NotificationCount';

  /**
   * The number to show
   */
  @Input() public count?: number = 0;

  @HostBinding('class.NotificationCount--hidden') public get hidden(): boolean {
    return isNullOrUndefined(this.count) || this.count < 1;
  }
}
