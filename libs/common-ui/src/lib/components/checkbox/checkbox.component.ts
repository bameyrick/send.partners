import { Component, forwardRef, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractControlComponent } from '../abstracts';

@Component({
  selector: 'checkbox',
  templateUrl: './checkbox.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
    {
      provide: AbstractControlComponent,
      useExisting: CheckboxComponent,
    },
  ],
})
export class CheckboxComponent extends AbstractControlComponent<boolean> {}
