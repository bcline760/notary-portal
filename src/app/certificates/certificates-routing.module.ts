import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertificatesComponent } from './certificates.component';
import { CertificateListComponent } from './certificate-list/certificate-list.component';
import { CertificateDetailComponent } from './certificate-detail/certificate-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CertificatesComponent,
    children: [{
      path: '',
      component: CertificateListComponent
    }, {
      path: 'detail/:slug',
      component: CertificateDetailComponent
    }]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertificatesRoutingModule { }
