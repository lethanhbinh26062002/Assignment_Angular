import { TestBed } from '@angular/core/testing';

import { CanAccessAdminService } from './can-access-admin.service';

describe('CanAccessAdminService', () => {
  let service: CanAccessAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanAccessAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
