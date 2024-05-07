import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:frontend-bar/src/app/components/products/list-product/list-product.component.spec.ts
import { ListProductComponent } from './list-product.component';

describe('ListProductComponent', () => {
  let component: ListProductComponent;
  let fixture: ComponentFixture<ListProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListProductComponent);
========
import { ListTableComponent } from './list-table.component';

describe('ListTableComponent', () => {
  let component: ListTableComponent;
  let fixture: ComponentFixture<ListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListTableComponent);
>>>>>>>> adcd591855b2fbfe64118ab4fefc8c0b5103789a:frontend-bar/src/app/components/table/list-table/list-table.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
