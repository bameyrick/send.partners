import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppTestingModule } from '../../../app-testing.module';
import { SignupNameFormComponent } from './signup-name-form/signup-name-form.component';

import { SignupNameComponent } from './signup-name.component';

describe('SignupNameComponent', () => {
  let component: SignupNameComponent;
  let fixture: ComponentFixture<SignupNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTestingModule],
      declarations: [SignupNameComponent, SignupNameFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
