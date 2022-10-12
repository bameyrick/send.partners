import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppTestingModule } from '../../../../app-testing.module';

import { SignupLocationFormComponent } from './signup-location-form.component';

describe(`SignupLocationFormComponent`, () => {
  let component: SignupLocationFormComponent;
  let fixture: ComponentFixture<SignupLocationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTestingModule],
      declarations: [SignupLocationFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupLocationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    Object.defineProperty(global.navigator, 'geolocation', { value: { getCurrentPosition: jest.fn() } });
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });

  describe(`getLocation()`, () => {
    it(`should set gettingLocation to true`, () => {
      expect(component.gettingLocation).toEqual(false);

      component.getLocation();

      expect(component.gettingLocation).toEqual(true);
    });

    it(`should set errorKey to undefined`, () => {
      component.errorKey = 'key';

      component.getLocation();

      expect(component.errorKey).toEqual(undefined);
    });

    it(`should call getCurrentPosition on navigator.geolocation`, () => {
      component.getLocation();

      expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalledTimes(1);
    });

    it(`should submit the form if getCurrentPosition position returls a value`, () => {
      Object.defineProperty(global.navigator, 'geolocation', {
        value: {
          getCurrentPosition: jest
            .fn()
            .mockImplementation((callback: (result: { coords: { latitude: number; longitude: number } }) => void) =>
              callback({ coords: { latitude: 0, longitude: 0 } })
            ),
        },
      });

      const submitSpy = jest.spyOn(component, 'submit');

      component.getLocation();

      expect((component as any).location.value).toEqual([0, 0]);
      expect(submitSpy).toHaveBeenCalledTimes(1);

      expect(component.gettingLocation).toEqual(false);
    });

    it(`should set the error key if getCurrentPosition returns an error`, () => {
      Object.defineProperty(global.navigator, 'geolocation', {
        value: {
          getCurrentPosition: jest
            .fn()
            .mockImplementation((_, errorCallback: (error: { code: number }) => void) => errorCallback({ code: 100 })),
        },
      });

      expect(component.errorKey).toEqual(undefined);

      component.getLocation();

      expect(component.errorKey).toEqual(`send_partners.location_error.code_100`);
      expect(component.gettingLocation).toEqual(false);
    });
  });
});
