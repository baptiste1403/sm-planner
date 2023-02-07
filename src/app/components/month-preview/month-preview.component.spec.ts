import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthPreviewComponent } from './month-preview.component';

describe('MonthPreviewComponent', () => {
  let component: MonthPreviewComponent;
  let fixture: ComponentFixture<MonthPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
