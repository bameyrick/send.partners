import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, ViewEncapsulation } from '@angular/core';
import { AbstractComponent } from '../../../components';
import { ToasterService } from '../toaster.service';

@Component({
  selector: 'common-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('toastAnimation', [
      transition(':enter', [
        style({ opacity: 0, height: 0, transform: `scale(0)` }),
        animate('200ms cubic-bezier(0.34, 1.3, 0.64, 1)', style({ opacity: 1, height: '*', transform: `scale(1)` })),
      ]),
      transition(':leave', [animate('200ms ease-in-out', style({ opacity: 0, height: 0, transform: `scale(0)` }))]),
    ]),
  ],
})
export class ToasterComponent extends AbstractComponent {
  /**
   * The BEM block name class
   */
  public readonly bemBlockClass: string = 'Toaster';

  /**
   * Whether the mouse is over the toaster
   */
  public mouseover = false;

  @HostListener('mouseover') protected onMouseOver(): void {
    this.mouseover = true;
  }

  @HostListener('mouseout') protected onMouseOut(): void {
    this.mouseover = false;
  }

  constructor(elementRef: ElementRef, public readonly toasterService: ToasterService) {
    super(elementRef);
  }

  protected override getHostClasses(): string[] {
    const classes = super.getHostClasses();

    classes.push(`${this.bemBlockClass}--${this.toasterService.config.position}`);

    return classes;
  }
}
