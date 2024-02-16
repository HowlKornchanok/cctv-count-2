import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainColumnChart } from './column-chart.component';

describe('MainColumnChart', () => {
  let component: MainColumnChart;
  let fixture: ComponentFixture<MainColumnChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [MainColumnChart],
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainColumnChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});