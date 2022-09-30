import { AbstractControl, UntypedFormControl, ValidatorFn } from '@angular/forms';
import { watchSwitchControlValues } from './watch-switch-control-values';

export function matchesValidator(matchingControl: UntypedFormControl, matchingControlId: string): ValidatorFn {
  let valueChangeWatcherAdded = false;

  return (control: AbstractControl) => {
    if (!valueChangeWatcherAdded) {
      valueChangeWatcherAdded = true;

      watchSwitchControlValues(matchingControl, control);
    }

    if (control?.value !== matchingControl.value) {
      return { doesNotMatch: matchingControlId };
    }

    return null;
  };
}
