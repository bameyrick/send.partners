import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthActions } from '../../auth';
import { CommonUiTestingModule } from '../../common-ui-testing.module';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonUiTestingModule],
      declarations: [LoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(`dispatch`, () => {
    it(`should dispatch the login action`, () => {
      const dispatchSpy = jest.spyOn((component as any).store, 'dispatch');
      const credentials = { email: 'email', password: 'password' };

      component.form.setValue(credentials);

      (component as any).dispatch();

      expect(dispatchSpy).toHaveBeenCalledWith(AuthActions.login({ credentials }));
    });
  });
});
