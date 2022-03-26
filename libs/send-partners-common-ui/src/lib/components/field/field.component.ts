import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractComponent, AbstractControlComponent } from '../abstracts';

@Component({
  selector: 'send-partners-common-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FieldComponent extends AbstractComponent implements OnInit {
  /**
   * The provided parent. This will be an extention of AbstractControlComponent
   */
  @Input() public parent?: unknown;

  /**
   * Expose AbstractControlComponent with typings
   */
  public control?: AbstractControlComponent<unknown>;

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
    return ['Form__field', ...super.getHostClasses()];
  }
}
