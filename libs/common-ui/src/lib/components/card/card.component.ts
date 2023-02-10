import { Component, ViewEncapsulation } from '@angular/core';
import { AbstractComponent } from '../abstracts';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent extends AbstractComponent {
  /**
   * The BEM block name class
   */
  public readonly bemBlockClass: string = 'Card';
}
