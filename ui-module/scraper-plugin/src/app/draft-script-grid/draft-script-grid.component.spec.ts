import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftScriptGridComponent } from './draft-script-grid.component';

describe('DraftScriptGridComponent', () => {
  let component: DraftScriptGridComponent;
  let fixture: ComponentFixture<DraftScriptGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftScriptGridComponent ],
      imports: [HttpClientModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftScriptGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
