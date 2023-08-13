import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'keys', loadChildren: () => import('./keys/keys.module').then(m => m.KeysModule) },
  { path: 'certificates', loadChildren: () => import('./certificates/certificates.module').then(m => m.CertificatesModule) },
  { path: 'overview', loadChildren: () => import('./overview/overview.module').then(m => m.OverviewModule) },
  { path: '', redirectTo: '/overview', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
