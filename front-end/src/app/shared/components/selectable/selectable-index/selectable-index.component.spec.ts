import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectableIndexComponent } from './selectable-index.component';

describe('SelectableIndexComponent', () => {
  let component: SelectableIndexComponent;
  let fixture: ComponentFixture<SelectableIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectableIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectableIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
