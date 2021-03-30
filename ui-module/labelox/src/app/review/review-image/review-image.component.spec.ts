import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewImageComponent } from './review-image.component';

describe('ReviewImageComponent', () => {
  let component: ReviewImageComponent;
  let fixture: ComponentFixture<ReviewImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
