import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargerSizeComponent } from './larger-size.component';

describe('LargerSizeComponent', () => {
  let component: LargerSizeComponent;
  let fixture: ComponentFixture<LargerSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LargerSizeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LargerSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
