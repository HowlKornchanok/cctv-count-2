import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCameraComponent } from './all-camera.component';

describe('AllCameraComponent', () => {
  let component: AllCameraComponent;
  let fixture: ComponentFixture<AllCameraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllCameraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
