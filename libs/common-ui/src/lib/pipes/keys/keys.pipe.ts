import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys',
})
export class KeysPipe implements PipeTransform {
  public transform(value?: Record<string, unknown> | null): unknown {
    return value ? Object.keys(value) : undefined;
  }
}
