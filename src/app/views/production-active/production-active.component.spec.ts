import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionActiveComponent } from './production-active.component';

describe('ProductionActiveComponent', () => {
  let component: ProductionActiveComponent;
  let fixture: ComponentFixture<ProductionActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
