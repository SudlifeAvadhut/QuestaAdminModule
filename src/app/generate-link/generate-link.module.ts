import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenerateLinkRoutingModule } from './generate-link-routing.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule,
    GenerateLinkRoutingModule
  ]
})
export class GenerateLinkModule { }
