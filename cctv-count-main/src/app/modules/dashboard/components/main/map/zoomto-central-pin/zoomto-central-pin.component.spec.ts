import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomToCentralPin } from './zoomto-central-pin.component';

describe('ZoomtoCentralPinComponent', () => {
  let component: ZoomToCentralPin;
  let fixture: ComponentFixture<ZoomToCentralPin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZoomToCentralPin]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZoomToCentralPin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
