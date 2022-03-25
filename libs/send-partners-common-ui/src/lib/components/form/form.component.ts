import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
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
   * Event listener for the submit
   */
  public readonly submit$ = fromEvent(this.nativeElement, 'submit');

  /**
   * Whether the form has been submitted
   */
  public submitted = false;

  constructor(elementRef: ElementRef) {
    super(elementRef);

    this.submit$.subscribe(() => {
      this.submitted = true;

      this.setHostClass();
    });
  }

  protected override getHostClass(): string {
    const classes = super.getHostClass().split(' ');

    if (this.submitted) {
      classes.push(`${this.bemBlockClass}--submitted`);
    }

    return classes.join(' ');
  }
}
