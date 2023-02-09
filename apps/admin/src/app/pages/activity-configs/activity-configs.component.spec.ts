import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityConfigsComponent } from './activity-configs.component';

describe('ActivityConfigsComponent', () => {
  let component: ActivityConfigsComponent;
  let fixture: ComponentFixture<ActivityConfigsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivityConfigsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActivityConfigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
