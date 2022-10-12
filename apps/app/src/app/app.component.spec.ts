import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppTestingModule } from './app-testing.module';

describe(`AppComponent`, () => {
  let component: AppComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [AppTestingModule],
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  }));

  it(`should create the component`, () => {
    expect(component).toBeTruthy();
  });

  describe(`logout`, () => {
    it(`should dispatch logout action`, () => {
      const dispatchSpy = jest.spyOn((component as any).store, 'dispatch');

      component.logout();

      expect(dispatchSpy).toHaveBeenCalledTimes(1);
    });
  });
});
