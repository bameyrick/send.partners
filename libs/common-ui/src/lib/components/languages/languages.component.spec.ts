import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonUiTestingModule, testLanguages } from '../../common-ui-testing.module';

import { LanguagesComponent } from './languages.component';

describe('LanguagesComponent', () => {
  let component: LanguagesComponent;
  let fixture: ComponentFixture<LanguagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonUiTestingModule],
      declarations: [LanguagesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(`on language change`, () => {
    it(`should call mapLanguageForDisplay`, () => {
      const spy = jest.spyOn(component as any, 'mapLanguageForDisplay');

      component.translateService.language$.next('cy');

      expect(spy).toHaveBeenCalledWith(testLanguages.find(({ code }) => code === 'cy'));
    });
  });
});
