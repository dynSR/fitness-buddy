import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseSelectorGroupComponent } from './exercise-selector-group.component';

describe('ExerciseSelectorGroupComponent', () => {
  let component: ExerciseSelectorGroupComponent;
  let fixture: ComponentFixture<ExerciseSelectorGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseSelectorGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseSelectorGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
