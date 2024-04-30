import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../global/material.module';
import { HttpClientModule } from '@angular/common/http';
import { DashboardLayoutComponent } from '../dashboard-layout/dashboard-layout.component';
import { DashboardScreenComponent } from '../dashboard-screen/dashboard-screen.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: DashboardScreenComponent }
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule
  ],
  declarations: [
    DashboardLayoutComponent,
    DashboardScreenComponent
  ],
  providers: [

  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
