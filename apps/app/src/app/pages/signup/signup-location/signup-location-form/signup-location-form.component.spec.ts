import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppTestingModule } from '../../../../app-testing.module';

import { SignupLocationFormComponent } from './signup-location-form.component';

describe('SignupLocationFormComponent', () => {
  let component: SignupLocationFormComponent;
  let fixture: ComponentFixture<SignupLocationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTestingModule],
      declarations: [SignupLocationFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupLocationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
