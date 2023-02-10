import { Component, ElementRef, HostBinding, Injector, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { IconDirective } from '../../icon';
import { AbstractComponent } from '../abstracts';
import { ButtonStyle } from './button-style';

@Component({
  selector: 'button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent extends AbstractComponent implements OnChanges {
  /**
   * The BEM block name class
   */
  public readonly bemBlockClass: string = 'Button';

  /**
   * The type of button we are displaying
   */
  @HostBinding('type') @Input() public type: 'button' | 'submit' = 'button';

  /**
   * The style of button to render
   */
  @Input() public style = ButtonStyle.Primary;

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

  /**
   * The attached icon directive
   */
  private readonly iconDirective = this.injector.get(IconDirective, null);

  constructor(elementRef: ElementRef, private injector: Injector) {
    super(elementRef);

    if (this.iconDirective) {
      this.iconDirective.iconClass = 'Button__icon';
    }
  }

  public ngOnChanges(): void {
    this.shouldDisable = this.disabled || !!this.loading;

    this.setHostClass();
  }

  protected override getHostClasses(): string[] {
    const classes = super.getHostClasses();

    classes.push(`${this.bemBlockClass}--${this.style}`);

    if (this.iconOnly) {
      classes.push(`${this.bemBlockClass}--icon-only`);
    }

    if (this.loading) {
      classes.push(`${this.bemBlockClass}--loading`);
    }

    return classes;
  }
}
