import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootProfileComponent } from './root-profile.component';

describe('RootProfileComponent', () => {
  let component: RootProfileComponent;
  let fixture: ComponentFixture<RootProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
