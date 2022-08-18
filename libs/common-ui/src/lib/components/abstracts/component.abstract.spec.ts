import { Component, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AbstractComponent } from './component.abstract';

@Component({
  selector: 'test-component',
  template: '',
})
class TestComponent extends AbstractComponent {}

@Component({
  selector: 'test-wrapper',
  template: '<test-component class="initialClass"></test-component>',
})
class TestWrapperComponent {
  @ViewChild(TestComponent) public readonly componentRef!: TestComponent;
}

describe(`AbstractComponent`, () => {
  let component: AbstractComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, TestWrapperComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(TestWrapperComponent);
    fixture.detectChanges();
    component = fixture.componentInstance.componentRef;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(`ngOnInit`, () => {
    it(`should add the classes to the element`, () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((component as any).hostClass).toEqual('Test initialClass');
    });
  });

  describe(`ngOnDestroy`, () => {
    it(`should unsubscribe from all subscriptions`, () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jest.spyOn((component as any).subscriptions, 'unsubscribe');

      component.ngOnDestroy();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((component as any).subscriptions.unsubscribe).toHaveBeenCalledTimes(1);
    });
  });
});
