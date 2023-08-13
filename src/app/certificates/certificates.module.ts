import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { ModalModule } from 'ngx-bootstrap/modal';

import { CertificateService } from '../service/certificate.service';
import { CertificateAuthorityService } from '../service/certificate-authority.service';

import { CertificatesRoutingModule } from './certificates-routing.module';
import { CertificatesComponent } from './certificates.component';
import { CertificateCreateComponent } from './certificate-create/certificate-create.component';
import { CertificateListComponent } from './certificate-list/certificate-list.component';

@NgModule({
  declarations: [
    CertificatesComponent,
    CertificateCreateComponent,
    CertificateListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatDividerModule,
    MatSelectModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatIconModule,
    NgChartsModule,
    ModalModule.forRoot(),
    CertificatesRoutingModule
  ],
  providers: [CertificateService, CertificateAuthorityService]
})
export class CertificatesModule { }
