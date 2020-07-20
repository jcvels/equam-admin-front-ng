import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersActiveComponent } from './orders-active.component';

describe('OrdersActiveComponent', () => {
  let component: OrdersActiveComponent;
  let fixture: ComponentFixture<OrdersActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
