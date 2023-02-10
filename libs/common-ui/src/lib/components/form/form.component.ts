import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { delay } from '@qntm-code/utils';
import { fromEvent } from 'rxjs';
// Must be relative to prevent circular dependency
import { AbstractComponent } from '../abstracts/component.abstract';

@Component({
  selector: 'form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormComponent extends AbstractComponent {
  /**
   * The BEM block name class
   */
  public readonly bemBlockClass: string = 'Form';

  /**
   * Reference to the provided form group
   */
  @Input() public formGroup?: UntypedFormGroup;

  /**
   * Event listener for the submit
   */
  public readonly submit$ = fromEvent(this.nativeElement, 'submit');

  /**
   * Whether the form has been submitted
   */
  public submitted = false;

  constructor(elementRef: ElementRef) {
    super(elementRef);

    this.subscriptions.add(
      this.submit$.subscribe(async () => {
        this.submitted = true;

        if (this.formGroup?.valid) {
          await delay();

          this.formGroup.disable();
        }

        this.setHostClass();
      })
    );
  }

  protected override getHostClasses(): string[] {
    const classes = super.getHostClasses();

    if (this.submitted) {
      classes.push(`${this.bemBlockClass}--submitted`);
    }

    return classes;
  }
}
