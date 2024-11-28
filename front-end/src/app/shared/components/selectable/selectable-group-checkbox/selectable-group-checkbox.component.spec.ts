import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectableGroupCheckboxComponent } from './selectable-group-checkbox.component';

describe('SelectableGroupCheckboxComponent', () => {
  let component: SelectableGroupCheckboxComponent;
  let fixture: ComponentFixture<SelectableGroupCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectableGroupCheckboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectableGroupCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
