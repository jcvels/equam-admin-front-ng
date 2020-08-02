import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootImagesComponent } from './root-images.component';

describe('RootImagesComponent', () => {
  let component: RootImagesComponent;
  let fixture: ComponentFixture<RootImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
