import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootLogComponent } from './root-log.component';

describe('RootLogComponent', () => {
  let component: RootLogComponent;
  let fixture: ComponentFixture<RootLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
