import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandNavComponent } from './land-nav.component';

describe('LandNavComponent', () => {
  let component: LandNavComponent;
  let fixture: ComponentFixture<LandNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
