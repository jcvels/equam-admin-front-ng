import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersProductionComponent } from './orders-production.component';

describe('OrdersProductionComponent', () => {
  let component: OrdersProductionComponent;
  let fixture: ComponentFixture<OrdersProductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersProductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
