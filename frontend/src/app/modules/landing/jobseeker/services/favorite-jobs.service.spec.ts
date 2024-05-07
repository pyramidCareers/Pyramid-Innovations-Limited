import { TestBed } from '@angular/core/testing';

import { FavoriteJobsService } from './favorite-jobs.service';

describe('FavoriteJobsService', () => {
  let service: FavoriteJobsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteJobsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
