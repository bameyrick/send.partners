import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { AbstractComponent } from '../abstracts';

@Component({
  selector: 'form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormComponent extends AbstractComponent {
  /**
   * Reference to the provided form group
   */
  @Input() public formGroup?: FormGroup;

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
      this.submit$.subscribe(() => {
        this.submitted = true;

        if (this.formGroup?.valid) {
          this.formGroup?.disable();
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
