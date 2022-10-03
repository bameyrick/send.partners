import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonUiTestingModule } from '../../common-ui-testing.module';

import { PanelComponent } from './panel.component';

describe('PanelComponent', () => {
  let component: PanelComponent;
  let fixture: ComponentFixture<PanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonUiTestingModule],
      declarations: [PanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(`ngOnChanges`, () => {
    describe(`when title is provided`, () => {
      beforeEach(() => {
        component.title = 'Test';
        component.ngOnChanges();
      });

      it(`should set labeledBy`, () => {
        expect(component.labeledBy).toBe(`${component.id}-title`);
      });

      it(`should set titleHTML`, () => {
        expect(component.titleHTML).toStrictEqual(
          (component as any).domSanitizer.bypassSecurityTrustHtml(
            `<h2 id="${(component as any).titleId}" class="${component.bemBlockClass}__title" tabindex="-1">Test</h2>`
          )
        );
      });
    });

    describe(`when title is not provided`, () => {
      beforeEach(() => {
        component.ngOnChanges();
      });

      it(`should set labeledBy`, () => {
        expect(component.labeledBy).toBeUndefined();
      });

      it(`should set titleHTML`, () => {
        expect(component.titleHTML).toBeUndefined();
      });
    });
  });
});
