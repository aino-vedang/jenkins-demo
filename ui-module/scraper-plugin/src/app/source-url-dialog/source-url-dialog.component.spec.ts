import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceUrlDialogComponent } from './source-url-dialog.component';

describe('SourceUrlDialogComponent', () => {
  let component: SourceUrlDialogComponent;
  let fixture: ComponentFixture<SourceUrlDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceUrlDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceUrlDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
