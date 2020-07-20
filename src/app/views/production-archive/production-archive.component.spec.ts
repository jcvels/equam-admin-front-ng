import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionArchiveComponent } from './production-archive.component';

describe('ProductionArchiveComponent', () => {
  let component: ProductionArchiveComponent;
  let fixture: ComponentFixture<ProductionArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
