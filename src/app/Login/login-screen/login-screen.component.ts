import { Component,OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OtpDialogComponent } from '../otp-dialog/otp-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {

  matDialogRef!: MatDialogRef<OtpDialogComponent>;
  //name: string = "";
  CandidateFg : FormGroup;
  submitted = false;
  constructor(private matDialog: MatDialog,private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    //this.name = 'Avadhut'

    this.CandidateFg = this.formBuilder.group(
      {

        email: ["", [Validators.required,Validators.email]],
      },
    )
  }

  get f() { return this.CandidateFg.controls; }

  OpenModal() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.CandidateFg.invalid) {
        return;
    }




    this.matDialogRef = this.matDialog.open(OtpDialogComponent, {
      data: { OtpNumber: '12345' },
      disableClose: true
    });

    this.matDialogRef.afterClosed().subscribe(res => {
      debugger
      if ((res == true)) {
        //this.name = "";
      }
    });
  }

}
