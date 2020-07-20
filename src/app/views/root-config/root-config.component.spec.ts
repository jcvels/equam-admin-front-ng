import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootConfigComponent } from './root-config.component';

describe('RootConfigComponent', () => {
  let component: RootConfigComponent;
  let fixture: ComponentFixture<RootConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
