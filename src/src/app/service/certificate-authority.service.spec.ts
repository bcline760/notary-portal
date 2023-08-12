import { TestBed } from '@angular/core/testing';

import { CertificateAuthorityService } from './certificate-authority.service';

describe('CertificateAuthorityService', () => {
  let service: CertificateAuthorityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CertificateAuthorityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
