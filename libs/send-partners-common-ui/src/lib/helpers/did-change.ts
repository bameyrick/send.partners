import { SimpleChange } from '@angular/core';
import { isEqual, isNullOrUndefined } from '@qntm-code/utils';

/**
 * Checks if a simple change value changed. Does not do a deep comparison if the SimpleChange is an object.
 */
export function didChange(change?: SimpleChange): boolean {
  return !isNullOrUndefined(change) && !isEqual(change.previousValue, change.currentValue);
}
