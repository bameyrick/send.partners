import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { CommonUiTestingModule } from '../../common-ui-testing.module';

import { CheckboxComponent } from './checkbox.component';

@Component({
  selector: 'test-component',
  template: `<checkbox [formControl]="control"></checkbox>`,
})
class TestComponent {
  @ViewChild(CheckboxComponent) public readonly componentRef!: CheckboxComponent;

  public readonly control = new FormControl();
}

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonUiTestingModule],
      declarations: [TestComponent, CheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    component = fixture.componentInstance.componentRef;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
