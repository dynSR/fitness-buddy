import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastSportSessionComponent } from './last-sport-session.component';

describe('LastSportSessionComponent', () => {
  let component: LastSportSessionComponent;
  let fixture: ComponentFixture<LastSportSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastSportSessionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastSportSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
