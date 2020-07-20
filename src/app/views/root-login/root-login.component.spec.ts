import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootLoginComponent } from './root-login.component';

describe('RootLoginComponent', () => {
  let component: RootLoginComponent;
  let fixture: ComponentFixture<RootLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
