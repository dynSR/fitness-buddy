import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesValidatorComponent } from './series-validator.component';

describe('SeriesValidatorComponent', () => {
  let component: SeriesValidatorComponent;
  let fixture: ComponentFixture<SeriesValidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesValidatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeriesValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
