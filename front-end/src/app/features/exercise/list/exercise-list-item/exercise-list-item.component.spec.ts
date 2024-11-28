import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseListItemComponent } from './exercise-list-item.component';

describe('ExerciseCardComponent', () => {
  let component: ExerciseListItemComponent;
  let fixture: ComponentFixture<ExerciseListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExerciseListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
