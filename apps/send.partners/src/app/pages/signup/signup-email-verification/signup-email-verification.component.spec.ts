import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupEmailVerificationComponent } from './signup-email-verification.component';

describe('SignupEmailVerificationComponent', () => {
  let component: SignupEmailVerificationComponent;
  let fixture: ComponentFixture<SignupEmailVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupEmailVerificationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupEmailVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
