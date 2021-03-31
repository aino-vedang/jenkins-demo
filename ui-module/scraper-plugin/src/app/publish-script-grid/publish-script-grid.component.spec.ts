import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishScriptGridComponent } from './publish-script-grid.component';

describe('PublishScriptGridComponent', () => {
  let component: PublishScriptGridComponent;
  let fixture: ComponentFixture<PublishScriptGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishScriptGridComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishScriptGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
