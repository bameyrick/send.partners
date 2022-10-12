import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonUiTestingModule } from '../../common-ui-testing.module';
import { Icon } from '../../enums';
import { IconDirective } from '../../icon';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonUiTestingModule],
      declarations: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(`getHostClasses`, () => {
    it(`should add the --icon-only modifier if the iconOnly input is true`, () => {
      component.iconOnly = true;

      expect((component as any).getHostClasses()).toContain('Button--icon-only');
    });

    it(`should add the --loading modifier if the loading input is true`, () => {
      component.loading = true;

      expect((component as any).getHostClasses()).toContain('Button--loading');
    });
  });
});

@Component({
  selector: 'test-component',
  template: `<button [icon]="Icon.eye"></button>`,
})
class TestComponent {
  public readonly Icon = Icon;

  @ViewChild(ButtonComponent) public readonly componentRef!: ButtonComponent;
}

describe(`ButtonComponent with icon`, () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<TestComponent>;
  let iconDirective: IconDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonUiTestingModule],
      declarations: [TestComponent, ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    component = fixture.componentInstance.componentRef;

    iconDirective = (component as any).iconDirective as IconDirective;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(iconDirective).toBeTruthy();
  });

  it(`should add a Button__icon class to the iconDirective`, () => {
    expect(iconDirective.iconClass).toContain('Button__icon');
  });
});
