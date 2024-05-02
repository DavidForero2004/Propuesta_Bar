import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditStatusComponent } from './add-or-edit-status.component';

describe('AddOrEditStatusComponent', () => {
  let component: AddOrEditStatusComponent;
  let fixture: ComponentFixture<AddOrEditStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddOrEditStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddOrEditStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
