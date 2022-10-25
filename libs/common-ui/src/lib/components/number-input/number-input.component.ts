import { Component, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractControlComponent } from '../abstracts';

@Component({
  selector: 'number-input',
  templateUrl: './number-input.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberInputComponent),
      multi: true,
    },
    {
      provide: AbstractControlComponent,
      useExisting: NumberInputComponent,
    },
  ],
})
export class NumberInputComponent extends AbstractControlComponent<number> {
  /**
   * The minimum value allowed
   */
  @Input() public min: number | string | null = null;

  /**
   * The maximum value allowed
   */
  @Input() public max: number | string | null = null;
}
