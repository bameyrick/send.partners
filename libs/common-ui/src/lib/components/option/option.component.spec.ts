import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { sanitizeSearchValue } from '@common';
import { CommonUiTestingModule } from '../../common-ui-testing.module';

import { OptionComponent } from './option.component';

@Component({
  selector: 'test-component',
  template: ` <dropdown-option #noContent></dropdown-option>
    <dropdown-option #htmlContent><div>Test HTML</div></dropdown-option>
    <dropdown-option #textContent>Test</dropdown-option>`,
})
class TestComponent {
  @ViewChild('noContent', { static: true }) public readonly noContent!: OptionComponent;

  @ViewChild('htmlContent', { static: true }) public readonly htmlContent!: OptionComponent;

  @ViewChild('textContent', { static: true }) public readonly textContent!: OptionComponent;

  constructor(public readonly domSanitizer: DomSanitizer) {}
}

describe('OptionComponent', () => {
  let component: OptionComponent;
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonUiTestingModule],
      declarations: [TestComponent, OptionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component = testComponent.noContent;

    expect(component).toBeTruthy();
  });

  describe(`when no content provided`, () => {
    beforeEach(() => {
      component = testComponent.noContent;
    });

    it(`html should be empty`, () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(component.html).toStrictEqual((component as any).domSanitizer.bypassSecurityTrustHtml(''));
    });

    it(`searchValue should be undefined`, () => {
      expect(component.searchValue).toBeUndefined();
    });
  });

  describe(`html content`, () => {
    beforeEach(() => {
      component = testComponent.htmlContent;
    });

    it(`html should reflect the content`, () => {
      const html: SafeHtml = testComponent.domSanitizer.bypassSecurityTrustHtml('<div>Test HTML</div>');

      expect(component.html).toEqual(html);
    });

    it(`should set the search value to the contents of the html`, () => {
      expect(component.searchValue).toEqual(sanitizeSearchValue('Test HTML'));
    });
  });

  describe(`text content`, () => {
    beforeEach(() => {
      component = testComponent.textContent;
    });

    it(`html should reflect the content`, () => {
      const html: SafeHtml = testComponent.domSanitizer.bypassSecurityTrustHtml('Test');

      expect(component.html).toEqual(html);
    });

    it(`should set the search value to the contents of the html`, () => {
      expect(component.searchValue).toEqual(sanitizeSearchValue('Test'));
    });
  });
});
