import { Directive, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { selectAuthorizing } from '../../../../auth';
import { filter, skip } from 'rxjs';
import { AppAbstractAuthPageComponent } from '../abstract-auth-page';

@Directive()
export abstract class AbstractAuthFormComponent extends AppAbstractAuthPageComponent implements OnInit, OnDestroy {
  /**
   * The form controls
   */
  public abstract readonly form: FormGroup;

  public override ngOnInit(): void {
    super.ngOnInit();

    this.store
      .select(selectAuthorizing)
      .pipe(
        filter(authorizing => !authorizing),
        skip(1)
      )
      .subscribe(() => this.form.enable());
  }

  public submit(): void {
    if (this.form.valid) {
      this.dispatch();
    }
  }

  protected abstract dispatch(): void;
}
