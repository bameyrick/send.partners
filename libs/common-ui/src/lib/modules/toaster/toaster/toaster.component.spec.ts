import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonUiTestingModule } from '../../../common-ui-testing.module';

import { ToasterComponent } from './toaster.component';

describe('ToasterComponent', () => {
  let component: ToasterComponent;
  let fixture: ComponentFixture<ToasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonUiTestingModule],
      declarations: [ToasterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(`mouseover`, () => {
    it(`should set the mouseover property to true when the mouse is over the toaster`, () => {
      expect(component.mouseover).toEqual(false);

      const event = new MouseEvent(`mouseover`);

      (component as any).elementRef.nativeElement.dispatchEvent(event);

      expect(component.mouseover).toEqual(true);
    });
  });

  describe(`mouseout`, () => {
    it(`should set the mouseover property to false when the mouse leaves the toaster`, () => {
      component.mouseover = true;

      const event = new MouseEvent(`mouseout`);

      (component as any).elementRef.nativeElement.dispatchEvent(event);

      expect(component.mouseover).toEqual(false);
    });
  });
});
