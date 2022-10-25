import { Pipe, PipeTransform } from '@angular/core';
import { ValuesType } from 'utility-types';

@Pipe({
  name: 'values',
})
export class ValuesPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public transform<T extends readonly any[] | ArrayLike<any> | Record<any, any>>(value?: T): ValuesType<T>[] | undefined {
    return value ? Object.values(value) : undefined;
  }
}
