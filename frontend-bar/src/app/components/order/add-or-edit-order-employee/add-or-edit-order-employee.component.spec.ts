import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditOrderEmployeeComponent } from './add-or-edit-order-employee.component';

describe('AddOrEditOrderEmployeeComponent', () => {
  let component: AddOrEditOrderEmployeeComponent;
  let fixture: ComponentFixture<AddOrEditOrderEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddOrEditOrderEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddOrEditOrderEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
