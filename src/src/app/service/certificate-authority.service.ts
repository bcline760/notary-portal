import { Injectable } from '@angular/core';
import { EntityService } from './entity.service';
import { CertificateAuthority } from '../contract/certificate-authority.contract';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Certificate } from '../contract/certificate.contract';

@Injectable({
  providedIn: 'root'
})
export class CertificateAuthorityService extends EntityService<CertificateAuthority> {
  constructor(private httpClient: HttpClient) {
    super(httpClient);

    this.controller = 'ca';
  }

  public getCertificates(slug: string): Observable<Certificate[]> {
    const url: string = `${environment.apiUrl}/ca/${slug}/certificates`;

    const certificates: Observable<Certificate[]> = this.httpClient.get<Certificate[]>(url).pipe(
      map(c => {
        return c;
      })
    );

    return certificates;
  }
}
