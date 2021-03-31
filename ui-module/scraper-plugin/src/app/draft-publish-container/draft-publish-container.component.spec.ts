import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftPublishContainerComponent } from './draft-publish-container.component';

describe('DraftPublishContainerComponent', () => {
  let component: DraftPublishContainerComponent;
  let fixture: ComponentFixture<DraftPublishContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftPublishContainerComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftPublishContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
