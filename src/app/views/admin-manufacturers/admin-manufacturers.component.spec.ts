import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManufacturersComponent } from './admin-manufacturers.component';

describe('AdminManufacturersComponent', () => {
  let component: AdminManufacturersComponent;
  let fixture: ComponentFixture<AdminManufacturersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminManufacturersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManufacturersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
