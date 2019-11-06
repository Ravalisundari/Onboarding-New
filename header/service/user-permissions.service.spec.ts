import { TestBed } from '@angular/core/testing';

import { UserPermissionsService } from './user-permissions.service';

describe('UserPermissionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserPermissionsService = TestBed.get(UserPermissionsService);
    expect(service).toBeTruthy();
  });
});
