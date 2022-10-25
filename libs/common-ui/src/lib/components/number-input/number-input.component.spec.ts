import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { CommonUiTestingModule } from '../../common-ui-testing.module';

import { NumberInputComponent } from './number-input.component';

@Component({
  selector: 'test-component',
  template: `<number-input [formControl]="control"></number-input>`,
})
class TestComponent {
  @ViewChild(NumberInputComponent) public readonly componentRef!: NumberInputComponent;

  public readonly control = new FormControl();
}

describe(`NumberInputComponent`, () => {
  let component: NumberInputComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonUiTestingModule],
      declarations: [TestComponent, NumberInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    component = fixture.componentInstance.componentRef;
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});
