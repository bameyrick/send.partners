import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppTestingModule } from '../../../../app-testing.module';
import { SignupActions } from '../../store';

import { SignupNameFormComponent } from './signup-name-form.component';

describe('SignupNameFormComponent', () => {
  let component: SignupNameFormComponent;
  let fixture: ComponentFixture<SignupNameFormComponent>;
  let mockStore: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTestingModule],
      declarations: [SignupNameFormComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(SignupNameFormComponent);
    component = fixture.componentInstance;

    jest.spyOn(mockStore, 'dispatch');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(`dispatch`, () => {
    it(`should dispath the signup action`, () => {
      component.form.patchValue({
        name: `name`,
      });

      (component as any).dispatch();

      expect(mockStore.dispatch).toHaveBeenCalledWith(
        SignupActions.setName({
          name: `name`,
        })
      );
    });
  });
});
