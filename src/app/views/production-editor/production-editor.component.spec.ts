import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionEditorComponent } from './production-editor.component';

describe('ProductionEditorComponent', () => {
  let component: ProductionEditorComponent;
  let fixture: ComponentFixture<ProductionEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
