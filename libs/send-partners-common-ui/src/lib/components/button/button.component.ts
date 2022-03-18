import { Component, HostBinding, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { AbstractComponent } from '../abstracts';

@Component({
  selector: 'button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent extends AbstractComponent implements OnChanges {
  /**
   * The type of button we are displaying
   */
  @HostBinding('type') @Input() public type: 'button' | 'submit' = 'button';

  /**
   * Whether the button should be disabled
   */
  @Input() public disabled?: boolean | null;

  /**
   * Whether we should show the button as loading
   */
  @Input() public loading?: boolean | null;

  /**
   * Whether this is am icon only button
   */

  @Input() public iconOnly?: boolean;

  /**
   * Whether to mark the button as disabled
   */
  @HostBinding('disabled') protected shouldDisable?: boolean;

  public ngOnChanges(): void {
    this.shouldDisable = this.disabled || !!this.loading;

    this.hostClass = this.getHostClass();
  }

  protected override getHostClass(): string {
    const classes = super.getHostClass().split(' ');

    if (this.iconOnly) {
      classes.push(`${this.bemBlockClass}--icon-only`);
    }

    if (this.loading) {
      classes.push(`${this.bemBlockClass}--loading`);
    }

    return classes.join(' ');
  }
}
