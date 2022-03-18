import { Component, ViewEncapsulation } from '@angular/core';
import { AppAbstractComponent } from '../../common';

@Component({
  selector: 'send-partners-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent extends AppAbstractComponent {}
