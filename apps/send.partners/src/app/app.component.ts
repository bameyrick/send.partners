import { Component, ViewEncapsulation } from '@angular/core';
import { AppAbstractComponent } from './common';

@Component({
  selector: 'send-partners-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent extends AppAbstractComponent {}
