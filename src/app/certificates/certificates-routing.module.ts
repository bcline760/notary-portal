import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertificatesComponent } from './certificates.component';
import { CertificateListComponent } from './certificate-list/certificate-list.component';
import { CertificateCreateComponent } from './certificate-create/certificate-create.component';

const routes: Routes = [
  {
    path: '',
    component: CertificatesComponent,
    children: [{
      path: '',
      component: CertificateListComponent
    }, {
      path: 'create/:slug',
      component: CertificateCreateComponent
    }]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertificatesRoutingModule { }
