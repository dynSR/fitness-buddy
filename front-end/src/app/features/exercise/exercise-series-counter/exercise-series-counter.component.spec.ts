import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseSeriesCounterComponent } from './exercise-series-counter.component';

describe('ExerciseSeriesCounterComponent', () => {
  let component: ExerciseSeriesCounterComponent;
  let fixture: ComponentFixture<ExerciseSeriesCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseSeriesCounterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseSeriesCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
