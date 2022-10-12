import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { CommonUiTestingModule } from '../../common-ui-testing.module';

import { FieldComponent } from './field.component';

describe('FieldComponent', () => {
  let component: FieldComponent;
  let fixture: ComponentFixture<FieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonUiTestingModule],
      declarations: [FieldComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldComponent);
    component = fixture.componentInstance;
  });

  describe(`without a formControl`, () => {
    it(`should log a console.error`, () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      fixture.detectChanges();

      expect(consoleSpy).toHaveBeenCalled();
    });
  });

  describe(`with a formControl`, () => {
    beforeEach(() => {
      component.parent = new FormControl();

      fixture.detectChanges();
    });

    it(`it should set the control`, () => {
      expect(component.control).toBeDefined();
    });
  });

  describe(`getHostClasses`, () => {
    beforeEach(() => {
      component.parent = new FormControl();

      fixture.detectChanges();
    });

    it(`should add a Form__field class`, () => {
      expect((component as any).getHostClasses()).toContain('Form__field');
    });
  });
});
