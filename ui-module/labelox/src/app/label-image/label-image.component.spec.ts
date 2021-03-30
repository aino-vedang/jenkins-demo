import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelImageComponent } from './label-image.component';

describe('LabelImageComponent', () => {
  let component: LabelImageComponent;
  let fixture: ComponentFixture<LabelImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
