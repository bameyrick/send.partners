import { TemplateRef, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Authority, User } from '@common';
import { createMock } from '@golevelup/ts-jest';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectAuthUser } from '../../auth';
import { HasAuthorityDirective } from './has-authority.directive';

describe('HasAuthorityDirective', () => {
  let mockStore: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
    });

    mockStore = TestBed.inject(MockStore);
  });

  it('should create an instance', () => {
    const directive = new HasAuthorityDirective(mockStore, createMock<ViewContainerRef>(), createMock<TemplateRef<unknown>>());
    expect(directive).toBeTruthy();
  });

  describe(`ngOnInit`, () => {
    it(`should throw an error if authority is not provided`, async () => {
      const directive = new HasAuthorityDirective(mockStore, createMock<ViewContainerRef>(), createMock<TemplateRef<unknown>>());

      await expect(directive.ngOnInit()).rejects.toThrowError(`Authority is required`);
    });

    it(`should throw an error if authority is invalid`, async () => {
      const directive = new HasAuthorityDirective(mockStore, createMock<ViewContainerRef>(), createMock<TemplateRef<unknown>>());
      directive.authority = 'invalid' as any;

      await expect(directive.ngOnInit()).rejects.toThrowError(`Invalid authority: invalid`);
    });

    it(`should clear the view container if the user is undefined`, async () => {
      mockStore.overrideSelector(selectAuthUser, undefined);

      const viewContainerRef = createMock<ViewContainerRef>();
      const directive = new HasAuthorityDirective(mockStore, viewContainerRef, createMock<TemplateRef<unknown>>());
      directive.authority = Authority.Admin;

      await directive.ngOnInit();

      expect(viewContainerRef.clear).toHaveBeenCalled();
    });

    it(`should clear the view container if the user doesn't have the required authority`, async () => {
      mockStore.overrideSelector(selectAuthUser, createMock<User>({ role: 'user' }));

      const viewContainerRef = createMock<ViewContainerRef>();
      const directive = new HasAuthorityDirective(mockStore, viewContainerRef, createMock<TemplateRef<unknown>>());
      directive.authority = Authority.Admin;

      await directive.ngOnInit();

      expect(viewContainerRef.clear).toHaveBeenCalled();
    });

    it(`should create an embedded view if the user has the required authority`, async () => {
      mockStore.overrideSelector(selectAuthUser, createMock<User>({ role: 'admin' }));

      const viewContainerRef = createMock<ViewContainerRef>();
      const templateRef = createMock<TemplateRef<unknown>>();
      const directive = new HasAuthorityDirective(mockStore, viewContainerRef, templateRef);
      directive.authority = Authority.Admin;

      await directive.ngOnInit();

      expect(viewContainerRef.createEmbeddedView).toHaveBeenCalledWith(templateRef);
    });
  });
});
