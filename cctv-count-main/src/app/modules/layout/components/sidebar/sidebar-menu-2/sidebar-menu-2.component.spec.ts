import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarMenu2Component } from './sidebar-menu-2.component';

describe('SidebarMenu2Component', () => {
  let component: SidebarMenu2Component;
  let fixture: ComponentFixture<SidebarMenu2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarMenu2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarMenu2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
