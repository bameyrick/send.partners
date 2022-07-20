import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppTestingModule } from '../../../app-testing.module';

import { RequestPasswordResetSuccessComponent } from './request-password-reset-success.component';

describe('RequestPasswordResetSuccessComponent', () => {
  let component: RequestPasswordResetSuccessComponent;
  let fixture: ComponentFixture<RequestPasswordResetSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTestingModule],
      declarations: [RequestPasswordResetSuccessComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPasswordResetSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
