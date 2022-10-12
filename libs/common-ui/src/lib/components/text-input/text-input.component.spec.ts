import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonUiTestingModule } from '../../common-ui-testing.module';
import { Icon } from '../../enums';

import { TextInputComponent } from './text-input.component';

describe('TextInputComponent', () => {
  let component: TextInputComponent;
  let fixture: ComponentFixture<TextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonUiTestingModule],
      declarations: [TextInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(`toggleInputType`, () => {
    describe(`when inputType is password`, () => {
      beforeEach(() => {
        component.inputType = 'password';
        component.toggleInputType();
      });

      it(`should set inputType to text`, () => {
        expect(component.inputType).toBe('text');
      });
    });

    describe(`when inputType is text`, () => {
      beforeEach(() => {
        component.inputType = 'text';
        component.toggleInputType();
      });

      it(`should set inputType to password`, () => {
        expect(component.inputType).toBe('password');
      });
    });
  });

  describe(`setIcon`, () => {
    it(`should set the icon to Search if the type is search`, () => {
      component.type = 'search';
      component.ngOnChanges({});

      expect(component.icon).toBe(Icon.Search);
    });

    it(`should set the icon to Spinner if field is set to loading`, () => {
      component.loading = true;
      component.ngOnChanges({});

      expect(component.icon).toBe(Icon.Spinner);
    });

    it(`should set the icon to Spinner if field is set to loading even if the type is search`, () => {
      component.loading = true;
      component.type = 'search';
      component.ngOnChanges({});

      expect(component.icon).toBe(Icon.Spinner);
    });
  });
});
