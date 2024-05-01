import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditRolComponent } from './add-or-edit-rol.component';

describe('AddOrEditRolComponent', () => {
  let component: AddOrEditRolComponent;
  let fixture: ComponentFixture<AddOrEditRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddOrEditRolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddOrEditRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
