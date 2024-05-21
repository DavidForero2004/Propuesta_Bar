import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormOrderClientComponent } from './add-form-order-client.component';

describe('AddFormOrderClientComponent', () => {
  let component: AddFormOrderClientComponent;
  let fixture: ComponentFixture<AddFormOrderClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddFormOrderClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddFormOrderClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
