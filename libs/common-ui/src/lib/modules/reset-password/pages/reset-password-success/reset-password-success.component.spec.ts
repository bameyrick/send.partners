import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonUiTestingModule } from '../../../../common-ui-testing.module';

import { ResetPasswordSuccessComponent } from './reset-password-success.component';

describe('ResetPasswordSuccessComponent', () => {
  let component: ResetPasswordSuccessComponent;
  let fixture: ComponentFixture<ResetPasswordSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonUiTestingModule],
      declarations: [ResetPasswordSuccessComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
