import { ComponentFixture, TestBed } from '@angular/core/testing';

import { APIDonutComponent } from './api-donut.component';

describe('APIDonutComponent', () => {
  let component: APIDonutComponent;
  let fixture: ComponentFixture<APIDonutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [APIDonutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(APIDonutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
