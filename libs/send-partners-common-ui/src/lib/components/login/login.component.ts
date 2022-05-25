import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginCredentials } from '@send.partners/common';
import { Observable } from 'rxjs';
import { didChange } from '../../helpers';
import { AbstractComponent } from '../abstracts';

@Component({
  selector: 'send-partners-common-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent extends AbstractComponent implements OnChanges {
  /**
   * An event emitter for the login details
   */
  @Output() public readonly login = new EventEmitter<LoginCredentials>();

  /**
   * Error message to display
   */
  @Input() public error$?: Observable<string | undefined>;

  /**
   * The form controls
   */
  public readonly form = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  public ngOnChanges(changes: SimpleChanges): void {
    if (didChange(changes['error'])) {
      this.form.enable();
    }
  }

  public submit(): void {
    if (this.form.valid) {
      this.login.emit(this.form.value);
    }
  }
}
