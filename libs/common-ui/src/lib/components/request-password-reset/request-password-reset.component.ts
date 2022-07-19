import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RequestPasswordResetCredentials } from '@common';
import { didChange } from '../../helpers';
import { AbstractComponent } from '../abstracts';

@Component({
  selector: 'common-request-password-reset',
  templateUrl: './request-password-reset.component.html',
  styleUrls: ['./request-password-reset.component.scss'],
})
export class RequestPasswordResetComponent extends AbstractComponent implements OnChanges {
  /**
   * An event emitter for the request password reset details
   */
  @Output() public readonly requestPasswordReset = new EventEmitter<RequestPasswordResetCredentials>();

  /**
   * Error message to display
   */
  @Input() public error?: string | null;

  /**
   * The form controls
   */
  public readonly form = new FormGroup({
    email: new FormControl(),
  });

  public ngOnChanges(changes: SimpleChanges): void {
    if (didChange(changes['error'])) {
      this.form.enable();
    }
  }

  public submit(): void {
    if (this.form.valid) {
      this.requestPasswordReset.emit({ ...this.form.value });
    }
  }
}
