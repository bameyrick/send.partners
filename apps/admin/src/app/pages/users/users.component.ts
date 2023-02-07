import { Component, ViewEncapsulation } from '@angular/core';
import { AbstractComponent } from '@common-ui';

@Component({
  selector: 'admin-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UsersComponent extends AbstractComponent {}
