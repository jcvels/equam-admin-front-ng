import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductorsArchiveComponent } from './productors-archive.component';

describe('ProductorsArchiveComponent', () => {
  let component: ProductorsArchiveComponent;
  let fixture: ComponentFixture<ProductorsArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductorsArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductorsArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
