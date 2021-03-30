import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInPipelineComponent } from './add-in-pipeline.component';

describe('AddInPipelineComponent', () => {
  let component: AddInPipelineComponent;
  let fixture: ComponentFixture<AddInPipelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInPipelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInPipelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
