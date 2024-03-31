import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendSessionModalComponent } from './extend-session-modal.component';

describe('ExtendSessionModalComponent', () => {
  let component: ExtendSessionModalComponent;
  let fixture: ComponentFixture<ExtendSessionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtendSessionModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExtendSessionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
