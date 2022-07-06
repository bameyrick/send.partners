import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupLocationComponent } from './signup-location.component';

describe('SignupLocationComponent', () => {
  let component: SignupLocationComponent;
  let fixture: ComponentFixture<SignupLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupLocationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
