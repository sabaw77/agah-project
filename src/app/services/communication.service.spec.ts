import { TestBed } from '@angular/core/testing';

import { CommunicationService } from './communication.service';
import { HttpClientModule } from '@angular/common/http';

describe('CommunicationService', () => {
  let service: CommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(CommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
