import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthActions } from '@common-ui';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { delay } from '@qntm-code/utils';
import { AppTestingModule } from '../../../app-testing.module';
import { SignupFormComponent } from './signup-form.component';

describe(`SignupFormComponent`, () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;
  let mockStore: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTestingModule],
      declarations: [SignupFormComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(SignupFormComponent);
    component = fixture.componentInstance;

    jest.spyOn(mockStore, 'dispatch');

    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });

  describe(`dispatch`, () => {
    it(`should dispath the signup action`, async () => {
      component.form.patchValue({
        email: `email`,
        password: `password`,
      });

      (component as any).dispatch();

      await delay();

      expect(mockStore.dispatch).toHaveBeenCalledWith(
        AuthActions.signUp({
          credentials: {
            email: `email`,
            password: `password`,
            language: 'en',
          },
        })
      );
    });
  });
});
