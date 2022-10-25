import { Component, ContentChildren, forwardRef, QueryList, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractControlComponent } from '../abstracts';
import { OptionValue } from '../option/option-value';
import { OptionComponent } from '../option/option.component';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
    {
      provide: AbstractControlComponent,
      useExisting: DropdownComponent,
    },
  ],
})
export class DropdownComponent extends AbstractControlComponent<OptionValue | Array<OptionValue>> {
  /**
   * The options available for selection
   */
  @ContentChildren(OptionComponent) public readonly options?: QueryList<OptionComponent>;
}
