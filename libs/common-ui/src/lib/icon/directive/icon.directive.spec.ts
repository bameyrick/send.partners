import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonUiTestingModule } from '../../common-ui-testing.module';
import { Icon } from '../../enums';
import { IconPlacement } from './icon-placement';
import { IconDirective } from './icon.directive';

@Component({
  selector: 'test-component',
  template: `<div [icon]="icon" [iconPlacement]="iconPlacement" [iconClass]="iconClass"><div #target></div></div>`,
})
class TestComponent {
  public icon?: Icon;

  public iconPlacement: IconPlacement = IconPlacement.Before;

  public iconClass?: string;

  @ViewChild(IconDirective) public directive!: IconDirective;

  @ViewChild('target') public target!: ElementRef;
}

describe('IconDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;
  let directive: IconDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonUiTestingModule],
      declarations: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
    fixture.detectChanges();

    directive = testComponent.directive;
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it(`should set the name to the name passed in`, () => {
    testComponent.icon = Icon.Search;

    fixture.detectChanges();

    expect(directive.iconName).toBe(Icon.Search);
  });

  it(`should place the svg after the element if IconPlacement is set to after`, () => {
    testComponent.icon = Icon.Search;
    testComponent.iconPlacement = IconPlacement.After;

    fixture.detectChanges();

    expect(testComponent.target.nativeElement.nextSibling).toBe((directive as any).svg);
  });

  it(`should add the iconClasses to the svg`, () => {
    testComponent.icon = Icon.Search;
    testComponent.iconClass = 'test-class1 test-class2';

    fixture.detectChanges();

    expect([...(directive as any).svg.classList]).toEqual(['test-class1', 'test-class2']);
  });

  it(`should remove the svg if the name is changed`, () => {
    testComponent.icon = Icon.Search;
    testComponent.iconPlacement = IconPlacement.After;

    fixture.detectChanges();

    expect(testComponent.target.nativeElement.nextSibling).toBe((directive as any).svg);

    testComponent.icon = undefined;

    fixture.detectChanges();

    expect(testComponent.target.nativeElement.nextSibling).not.toBe((directive as any).svg);
  });
});
