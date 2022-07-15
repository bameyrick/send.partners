import { AbstractControl } from '@angular/forms';
import { delay, distinctUntilChanged } from 'rxjs';

export function watchSwitchControlValues(matchingControl: AbstractControl, control: AbstractControl | null): void {
  /**
   * Revalidate controls that depends on the state of the switch control, we add a 0 ms delay to push the check into the next cycle
   * otherwise the validator will see the old value of the matchingControl
   */
  matchingControl.valueChanges.pipe(distinctUntilChanged(), delay(0)).subscribe(() => {
    if (control && control.updateValueAndValidity) {
      control.updateValueAndValidity();
    }
  });
}
