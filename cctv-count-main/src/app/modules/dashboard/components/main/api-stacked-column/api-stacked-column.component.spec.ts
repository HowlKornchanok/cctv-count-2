import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiStackedColumnComponent } from './api-stacked-column.component';

describe('ApiStackedColumnComponent', () => {
  let component: ApiStackedColumnComponent;
  let fixture: ComponentFixture<ApiStackedColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiStackedColumnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApiStackedColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
