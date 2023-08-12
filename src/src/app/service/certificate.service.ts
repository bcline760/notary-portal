import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Certificate } from '../contract/certificate.contract';
import { CertificateDownloadRequest } from '../contract/certificate-download-request.contract';
import { CertificateFormat } from '../contract/certificate-format.enum';
import { CertificateRequest } from '../contract/certificate-request.contract';
import { EntityService } from './entity.service';

@Injectable({
  providedIn: 'root'
})
export class CertificateService extends EntityService<Certificate> {

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  public downloadCertificate(request: CertificateDownloadRequest): Observable<Blob> {
    const url: string = `${environment.apiUrl}/certificates/${request.slug}/download-request`

    const certificateBinary = this.httpClient.post(url, request, {
      responseType: 'blob'
    })

    return certificateBinary;
  }

  public issueCertificate(request: CertificateRequest): Observable<Certificate> {
    const url: string = `${environment.apiUrl}/certificates/issue`;

    const certificate: Observable<Certificate> = this.httpClient.post<Certificate>(url, request).pipe(
      map(c => {
        return c;
      })
    );

    return certificate;
  }
}