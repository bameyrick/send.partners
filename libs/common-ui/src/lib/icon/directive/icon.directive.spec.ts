import { ElementRef } from '@angular/core';
import { createMock } from '@golevelup/ts-jest';
import { SvgSymbolsService } from '../service';
import { IconDirective } from './icon.directive';

describe('IconDirective', () => {
  it('should create an instance', () => {
    const directive = new IconDirective(createMock<Document>(), createMock<ElementRef>(), createMock<SvgSymbolsService>());
    expect(directive).toBeTruthy();
  });
});
