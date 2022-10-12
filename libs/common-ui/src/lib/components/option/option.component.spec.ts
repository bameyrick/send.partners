import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { sanitizeSearchValue } from '@common';
import { CommonUiTestingModule } from '../../common-ui-testing.module';

import { OptionComponent } from './option.component';

@Component({
  selector: 'test-component',
  template: `<dropdown-option #noContent></dropdown-option>
    <dropdown-option #htmlContent><div>Test HTML</div></dropdown-option>
    <dropdown-option #textContent>Test</dropdown-option>`,
})
class TestComponent {
  @ViewChild('noContent') public readonly noContent!: OptionComponent;

  @ViewChild('htmlContent') public readonly htmlContent!: OptionComponent;

  @ViewChild('textContent') public readonly textContent!: OptionComponent;

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
  });

  it('should create', () => {
    fixture.detectChanges();

    component = testComponent.noContent;

    expect(component).toBeTruthy();
  });

  describe(`when no content provided`, () => {
    beforeEach(() => {
      fixture.detectChanges();

      component = testComponent.noContent;
    });

    it(`html should be empty`, () => {
      expect(component.html).toStrictEqual(testComponent.domSanitizer.bypassSecurityTrustHtml(''));
    });

    it(`searchValue should be undefined`, () => {
      expect(component.searchValue).toBeUndefined();
    });
  });

  describe(`html content`, () => {
    beforeEach(() => {
      fixture.detectChanges();

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
      fixture.detectChanges();

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

  describe(`stringValue`, () => {
    beforeEach(() => {
      component.stringValue = 'Test String Value';

      component.getHTML();
    });

    it(`should set the search value to the stringValue`, () => {
      expect(component.searchValue).toEqual(sanitizeSearchValue('Test String Value'));
    });
  });
});
