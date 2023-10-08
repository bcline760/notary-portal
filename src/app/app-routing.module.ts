import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule), canActivate: [MsalGuard] },
  { path: 'keys', loadChildren: () => import('./keys/keys.module').then(m => m.KeysModule), canActivate: [MsalGuard] },
  { path: 'certificates', loadChildren: () => import('./certificates/certificates.module').then(m => m.CertificatesModule), canActivate: [MsalGuard] },
  { path: 'overview', loadChildren: () => import('./overview/overview.module').then(m => m.OverviewModule), canActivate: [MsalGuard] },
  { path: '', redirectTo: 'overview', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
