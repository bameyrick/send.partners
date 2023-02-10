import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { LabelPosition } from '../../enums';
import { AbstractComponent, AbstractControlComponent } from '../abstracts';

@Component({
  selector: 'p[field]',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FieldComponent extends AbstractComponent implements OnInit {
  /**
   * The BEM block name class
   */
  public readonly bemBlockClass: string = 'Field';

  /**
   * The provided parent. This will be an extention of AbstractControlComponent
   */
  @Input() public parent?: unknown;

  /**
   * Whether the label should be rendered before or after the input
   */
  @Input() public labelPosition = LabelPosition.Before;

  /**
   * Whether to layout the field horizontally
   */
  @Input() public horizontal = false;

  /**
   * Expose AbstractControlComponent with typings
   */
  public control?: AbstractControlComponent<unknown>;

  /**
   * Expose the LabelPosition enum to the view
   */
  public readonly LabelPosition = LabelPosition;

  public override ngOnInit(): void {
    super.ngOnInit();

    if (this.parent) {
      this.control = this.parent as AbstractControlComponent<unknown>;
    } else {
      console.error('Field was created without providing a parent control');
    }
  }

  /**
   * Gets the host class and allows extending classes to extend by returning super.hostClass + 'custom-class'
   */
  protected override getHostClasses(): string[] {
    const classes = ['Form__field', ...super.getHostClasses()];

    if (this.horizontal) {
      classes.push(`${this.bemBlockClass}--horizontal`);
    }

    return classes;
  }
}
