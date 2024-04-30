import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LinkGenerationComponent } from './link-generation/link-generation.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardLayoutComponent } from '../Dashboard/dashboard-layout/dashboard-layout.component';
import { MasterService } from './Service/master.service';
import { LinkGenerationService } from './Service/link-generation.service';
import { MaterialModule } from '../generate-link/global/material.module';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: LinkGenerationComponent }
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
    LinkGenerationComponent
  ],
  providers: [
    MasterService,
    LinkGenerationService
  ],
  exports: [RouterModule]
})
export class GenerateLinkRoutingModule { }
