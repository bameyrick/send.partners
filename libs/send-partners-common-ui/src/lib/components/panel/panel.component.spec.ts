import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SendPartnersCommonUiTestingModule } from '../../send-partners-common-ui-testing.module';

import { PanelComponent } from './panel.component';

describe('PanelComponent', () => {
  let component: PanelComponent;
  let fixture: ComponentFixture<PanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendPartnersCommonUiTestingModule],
      declarations: [PanelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
