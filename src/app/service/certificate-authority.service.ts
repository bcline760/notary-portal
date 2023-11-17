import { Injectable } from '@angular/core';
import { EntityService } from './entity.service';
import { CertificateAuthority } from '../contract/certificate-authority.contract';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Certificate } from '../contract/certificate.contract';

@Injectable({
  providedIn: 'root'
})
export class CertificateAuthorityService extends EntityService<CertificateAuthority> {
  private _selectedCertificateAuthority: CertificateAuthority | null;

  private _caSubject: BehaviorSubject<CertificateAuthority | null>;

  constructor(private httpClient: HttpClient) {
    super(httpClient);

    this.controller = 'ca';
    this._selectedCertificateAuthority = null;
    this._caSubject = new BehaviorSubject<CertificateAuthority | null>(null);
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

  public get selectedCertificateAuthority(): CertificateAuthority | null { return this._selectedCertificateAuthority; }
  public set selectedCertificateAuthority(value: CertificateAuthority | null) {
    this._selectedCertificateAuthority = value;

    if (this._caSubject !== null) {
      this._caSubject.next(value);
    }
  }

  public get subject(): BehaviorSubject<CertificateAuthority | null> { return this._caSubject; }
}
