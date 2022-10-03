import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { CommonUiTestingModule } from '../../common-ui-testing.module';

import { DropdownComponent } from './dropdown.component';

@Component({
  selector: 'test-component',
  template: `<dropdown [formControl]="control"><dropdown-option></dropdown-option><dropdown-option></dropdown-option></dropdown>`,
})
class TestComponent {
  @ViewChild(DropdownComponent) public readonly componentRef!: DropdownComponent;

  public readonly control = new FormControl();
}

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonUiTestingModule],
      declarations: [TestComponent, DropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    component = fixture.componentInstance.componentRef;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.options?.length).toBe(2);
  });
});
