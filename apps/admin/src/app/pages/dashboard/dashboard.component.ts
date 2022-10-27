import { Component, ViewEncapsulation } from '@angular/core';
import { AbstractComponent } from '@common-ui';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent extends AbstractComponent {}
