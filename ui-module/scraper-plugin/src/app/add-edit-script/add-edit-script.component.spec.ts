import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditScriptComponent } from './add-edit-script.component';

describe('AddEditScriptComponent', () => {
  let component: AddEditScriptComponent;
  let fixture: ComponentFixture<AddEditScriptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditScriptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditScriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
