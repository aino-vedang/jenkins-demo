import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelSettingComponent } from './model-setting.component';

describe('ModelSettingComponent', () => {
  let component: ModelSettingComponent;
  let fixture: ComponentFixture<ModelSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
