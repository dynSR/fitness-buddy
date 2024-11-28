import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSessionModalComponent } from '../new-session-modal.component';

describe('NewSessionModalComponent', () => {
  let component: NewSessionModalComponent;
  let fixture: ComponentFixture<NewSessionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSessionModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewSessionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
