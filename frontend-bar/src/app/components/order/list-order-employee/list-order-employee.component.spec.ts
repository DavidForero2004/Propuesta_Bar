import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrderEmployeeComponent } from './list-order-employee.component';

describe('ListOrderEmployeeComponent', () => {
  let component: ListOrderEmployeeComponent;
  let fixture: ComponentFixture<ListOrderEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListOrderEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListOrderEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
