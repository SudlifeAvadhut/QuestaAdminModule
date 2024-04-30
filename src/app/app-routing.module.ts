import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'Login', loadChildren: () => import('./Login/login/login-routing.module')
      .then(m => m.LoginRoutingModule)
  },
  {
    path: 'DashBoard', loadChildren: () => import('./Dashboard/dashboard/dashboard-routing.module')
      .then(m => m.DashboardRoutingModule)
  },
  {
    path: 'GenerateLink', loadChildren: () => import('./generate-link/generate-link-routing.module')
      .then(m => m.GenerateLinkRoutingModule)
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
