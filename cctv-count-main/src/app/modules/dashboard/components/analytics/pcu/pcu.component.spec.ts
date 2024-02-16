import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PCUComponent } from './pcu.component';

describe('PCUComponent', () => {
  let component: PCUComponent;
  let fixture: ComponentFixture<PCUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PCUComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PCUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
