import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { AuthActions } from '../../../../auth';
import { CommonUiTestingModule } from '../../../../common-ui-testing.module';

import { ResetPasswordComponent } from './reset-password.component';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonUiTestingModule],
      declarations: [ResetPasswordComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { code: 'code' } },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(`dispatch`, () => {
    it(`should dispatch the resetPassword action`, () => {
      const dispatchSpy = jest.spyOn((component as any).store, 'dispatch');
      component.form.setValue({ password: 'password' });

      (component as any).dispatch();

      expect(dispatchSpy).toHaveBeenCalledWith(AuthActions.resetPassword({ credentials: { password: 'password', code: 'code' } }));
    });
  });
});
