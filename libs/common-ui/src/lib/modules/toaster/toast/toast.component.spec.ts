import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { CommonUiTestingModule } from '../../../common-ui-testing.module';

import { ToastComponent } from './toast.component';

describe(`ToastComponent`, () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonUiTestingModule],
      declarations: [ToastComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;

    component.toast = {
      id: `test`,
      body: `test`,
      options: {
        duration: 1,
      },
    };
  });

  it(`should create`, () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  describe(`getHostClasses`, () => {
    it(`should add a modifier class for the toast type`, () => {
      component.toast.options.type = `success`;

      fixture.detectChanges();

      expect((component as any).getHostClasses()).toContain(`Toast--success`);
    });
  });

  describe(`remaining$`, () => {
    it(`should call removeToast when the remaining time is 0`, fakeAsync(() => {
      const spy = jest.spyOn(component.toasterService, `removeToast`);

      fixture.detectChanges();

      tick(1000);

      expect(spy).toHaveBeenCalledWith(component.toast.id);

      tick(10);
    }));

    it(`should set the expiryProgress$ observable to the percentage of time remaining`, fakeAsync(() => {
      fixture.detectChanges();

      tick(490);

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      expect(firstValueFrom(component.expiryProgress$!)).resolves.toEqual(`50%`);

      tick(500);

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      expect(firstValueFrom(component.expiryProgress$!)).resolves.toEqual(`100%`);

      tick(20);
    }));
  });
});
