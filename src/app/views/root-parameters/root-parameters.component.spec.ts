import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootParametersComponent } from './root-parameters.component';

describe('RootParametersComponent', () => {
  let component: RootParametersComponent;
  let fixture: ComponentFixture<RootParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootParametersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
