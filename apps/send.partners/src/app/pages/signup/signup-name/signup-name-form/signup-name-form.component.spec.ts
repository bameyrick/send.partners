import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SendPartnersTestingModule } from '../../../../app-testing.module';

import { SignupNameFormComponent } from './signup-name-form.component';

describe('SignupNameFormComponent', () => {
  let component: SignupNameFormComponent;
  let fixture: ComponentFixture<SignupNameFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendPartnersTestingModule],
      declarations: [SignupNameFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupNameFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
