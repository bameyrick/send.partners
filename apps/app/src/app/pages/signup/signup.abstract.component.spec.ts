import { Component, Input, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppPath, getRouterLinkForAppPath, User } from '@common';
import { selectAuthUser } from '@common-ui';
import { createMock } from '@golevelup/ts-jest';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { delay } from '@qntm-code/utils';
import { AppTestingModule } from '../../app-testing.module';
import { AbstractSignupStepComponent } from './signup.abstract.component';

@Component({
  selector: `test-component`,
  template: ``,
})
class TestComponent extends AbstractSignupStepComponent {
  @Input() public readonly path!: AppPath;
}

@Component({
  selector: `test-wrapper`,
  template: `<test-component [path]="path"></test-component>`,
})
class TestWrapperComponent {
  @ViewChild(TestComponent) public readonly componentRef!: TestComponent;

  public path!: AppPath;
}

describe(`AbstractSignupStepComponent`, () => {
  let fixture: ComponentFixture<TestWrapperComponent>;
  let wrapper: TestWrapperComponent;
  let component: TestComponent;
  let mockStore: MockStore;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, TestWrapperComponent],
      imports: [AppTestingModule],
      providers: [
        provideMockStore(),
        {
          provide: Router,
          useValue: createMock<Router>({
            navigateByUrl: jest.fn(),
          }),
        },
      ],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    router = TestBed.inject(Router);

    mockStore.overrideSelector(selectAuthUser, undefined);

    fixture = TestBed.createComponent(TestWrapperComponent);

    wrapper = fixture.componentInstance;
    wrapper.path = AppPath.Signup;

    fixture.detectChanges();

    component = wrapper.componentRef;
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });

  describe(`listenForNextStep`, () => {
    it(`should navigate to the next path when the current step's rule passes`, async () => {
      mockStore.overrideSelector(selectAuthUser, {} as User);

      component.ngOnInit();

      await delay();

      expect(router.navigateByUrl).toHaveBeenCalledWith(getRouterLinkForAppPath(AppPath.SignupVerify));
    });

    it(`should navigate to the root if there is no more signup steps`, async () => {
      wrapper.path = AppPath.SignupLocation;

      fixture.detectChanges();

      mockStore.overrideSelector(selectAuthUser, { locations: [[0, 0]] } as User);

      component.ngOnInit();

      await delay();

      expect(router.navigateByUrl).toHaveBeenCalledWith(getRouterLinkForAppPath(AppPath.Root));
    });
  });
});
