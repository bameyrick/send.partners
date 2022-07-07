import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SendPartnersTestingModule } from '../../../app-testing.module';
import { EmailVerificationComponent } from '../../../common';

import { SignupEmailVerificationComponent } from './signup-email-verification.component';

describe('SignupEmailVerificationComponent', () => {
  let component: SignupEmailVerificationComponent;
  let fixture: ComponentFixture<SignupEmailVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendPartnersTestingModule],
      declarations: [SignupEmailVerificationComponent, EmailVerificationComponent],
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
