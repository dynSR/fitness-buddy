import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterGroupSelectorComponent } from './filter-group-selector.component';

describe('FilterGroupSelectorComponent', () => {
  let component: FilterGroupSelectorComponent;
  let fixture: ComponentFixture<FilterGroupSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterGroupSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterGroupSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
