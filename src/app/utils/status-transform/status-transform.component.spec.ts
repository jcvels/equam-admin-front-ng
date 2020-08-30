import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusTransformComponent } from './status-transform.component';

describe('StatusTransformComponent', () => {
  let component: StatusTransformComponent;
  let fixture: ComponentFixture<StatusTransformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusTransformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusTransformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
