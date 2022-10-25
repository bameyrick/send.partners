import { TestBed } from '@angular/core/testing';
import * as uuid from 'uuid';

import { CommonUiTestingModule } from '../../common-ui-testing.module';
import { ToasterService } from './toaster.service';

describe(`ToasterService`, () => {
  let service: ToasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonUiTestingModule],
    });
    service = TestBed.inject(ToasterService);
  });

  it(`should be created`, () => {
    expect(service).toBeTruthy();
  });

  describe(`pop`, () => {
    it(`should add a toast to the activeToasts$`, async () => {
      const spy = jest.spyOn(service.activeToasts$, 'next');

      jest.spyOn(uuid, 'v4').mockReturnValue('test');

      await service.pop({
        title: `test`,
        body: `test`,
        options: {
          duration: 1,
        },
      });

      expect(spy).toHaveBeenCalledWith([
        {
          id: `test`,
          title: `test`,
          body: `test`,
          options: {
            duration: 1,
          },
        },
      ]);
    });
  });
});
