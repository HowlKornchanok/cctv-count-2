import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationEditModalComponent } from './station-edit-modal.component';

describe('UserEditModalComponent', () => {
  let component: StationEditModalComponent;
  let fixture: ComponentFixture<StationEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StationEditModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StationEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
