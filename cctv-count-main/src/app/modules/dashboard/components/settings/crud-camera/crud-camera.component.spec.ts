import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRUDCameraComponent } from './crud-camera.component';

describe('CRUDCameraComponent', () => {
  let component: CRUDCameraComponent;
  let fixture: ComponentFixture<CRUDCameraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CRUDCameraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CRUDCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
