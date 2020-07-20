import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductorsActiveComponent } from './productors-active.component';

describe('ProductorsActiveComponent', () => {
  let component: ProductorsActiveComponent;
  let fixture: ComponentFixture<ProductorsActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductorsActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductorsActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
