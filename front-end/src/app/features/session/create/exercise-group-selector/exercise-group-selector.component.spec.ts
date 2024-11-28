import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseGroupSelectorComponent } from './exercise-group-selector.component';

describe('ExerciseGroupSelectorComponent', () => {
  let component: ExerciseGroupSelectorComponent;
  let fixture: ComponentFixture<ExerciseGroupSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseGroupSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseGroupSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
