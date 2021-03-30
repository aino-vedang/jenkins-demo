import { TestBed } from '@angular/core/testing';

import { SetSlimService } from './set-slim.service';

describe('SetSlimService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SetSlimService = TestBed.get(SetSlimService);
    expect(service).toBeTruthy();
  });
});
