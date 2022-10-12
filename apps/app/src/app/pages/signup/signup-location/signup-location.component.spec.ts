import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppTestingModule } from '../../../app-testing.module';
import { SignupLocationFormComponent } from './signup-location-form/signup-location-form.component';

import { SignupLocationComponent } from './signup-location.component';

describe('SignupLocationComponent', () => {
  let component: SignupLocationComponent;
  let fixture: ComponentFixture<SignupLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTestingModule],
      declarations: [SignupLocationComponent, SignupLocationFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
