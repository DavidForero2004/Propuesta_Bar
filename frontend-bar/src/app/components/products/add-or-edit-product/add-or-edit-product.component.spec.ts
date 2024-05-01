import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditProductComponent } from './add-or-edit-product.component';

describe('AddOrEditProductComponent', () => {
  let component: AddOrEditProductComponent;
  let fixture: ComponentFixture<AddOrEditProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddOrEditProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddOrEditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
