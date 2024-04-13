import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationAddModalComponent } from './station-add-modal.component';

describe('UserAddModalComponent', () => {
  let component: StationAddModalComponent;
  let fixture: ComponentFixture<StationAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StationAddModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StationAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
