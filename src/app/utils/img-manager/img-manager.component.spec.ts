import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgManagerComponent } from './img-manager.component';

describe('ImgManagerComponent', () => {
  let component: ImgManagerComponent;
  let fixture: ComponentFixture<ImgManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
