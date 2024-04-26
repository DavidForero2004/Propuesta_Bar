import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditEventComponent } from './add-or-edit-event.component';

describe('AddOrEditEventComponent', () => {
  let component: AddOrEditEventComponent;
  let fixture: ComponentFixture<AddOrEditEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddOrEditEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddOrEditEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
