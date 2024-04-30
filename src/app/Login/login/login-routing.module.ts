import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginLayoutComponent } from '../login-layout/login-layout.component';
import { LoginScreenComponent } from '../login-screen/login-screen.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../global/material.module';
import { HttpClientModule } from '@angular/common/http';
import { OtpDialogComponent } from '../otp-dialog/otp-dialog.component';
import { FocusMeDirective } from '../global/focus-me.directive';
import { OtpValidationDirective } from '../global/otp-validation.directive';


const routes: Routes = [
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      { path: '', component: LoginScreenComponent }
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
    LoginLayoutComponent,
    LoginScreenComponent,
    OtpDialogComponent,
    FocusMeDirective,
    OtpValidationDirective
  ],
  providers: [

  ],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
