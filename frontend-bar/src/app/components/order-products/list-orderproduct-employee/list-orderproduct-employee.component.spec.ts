import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrderproductEmployeeComponent } from './list-orderproduct-employee.component';

describe('ListOrderproductEmployeeComponent', () => {
  let component: ListOrderproductEmployeeComponent;
  let fixture: ComponentFixture<ListOrderproductEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListOrderproductEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListOrderproductEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
