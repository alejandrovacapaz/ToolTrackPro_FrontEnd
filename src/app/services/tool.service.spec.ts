import { TestBed } from '@angular/core/testing';

import { ToolService } from './tool.service';

describe('ToolServiceService', () => {
  let service: ToolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
