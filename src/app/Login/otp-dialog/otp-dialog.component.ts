import { Component, Inject, OnInit, Output,EventEmitter,Input } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { control } from '../model/control.model';

@Component({
  selector: 'app-otp-dialog',
  templateUrl: './otp-dialog.component.html',
  styleUrls: ['./otp-dialog.component.css']
})
export class OtpDialogComponent implements OnInit {
  OTPNumber: string;
  code: FormArray;
  elemsSize: any[];
  currentIndex = 0;
  otpCode: number[] = [];
  @Input() otpSize: number;
  @Input() disabled: boolean;
  @Output() changeValue: EventEmitter<string> = new EventEmitter();
  @Output() codeEntered: EventEmitter<string> = new EventEmitter();
  message : string;

  public ListX: control[] = [];
  constructor(private _mdr: MatDialogRef<OtpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {

  }
  ngOnInit(): void {
    debugger
    this.message = '';
    this.elemsSize = new Array(5);
    for(let i = 1 ; i < 6 ;i++){
      this.ListX.push({id : i,name : 'ctr'+i,value : ''});
    }
  }
  CloseDialog() {
    this._mdr.close(false)
  }
  valdiateOtp(){
    debugger;
    var num = this.otpCode; 
    this.message = 'OTP does not match with current entered value'
  }
  public onFocus(index : any) {
    if (this.currentIndex) {
      this.currentIndex = index;
    }
  }

  public onNewVal(value: number, elementIndex: number): void {
    this.otpCode[elementIndex] = value;
    const checkOtp = this.checkOtp(this.otpCode);
    this.changeValue.emit(checkOtp.otpString);

    if (checkOtp.isValid) {
      this.codeEntered.emit(checkOtp.otpString);
    }
  }

  checkOtp(otpArr: number[]): { isValid: boolean, otpString: string } {
    const otpString = otpArr.filter((codeDigit: number) => Number.isInteger(codeDigit)).join('');

    return {
      isValid: otpString.length === this.otpSize,
      otpString: otpString
    };
  }

  public onChangeFocus(direction: string, elementIndex: number): void {
    switch (direction) {
      case ('next'): {
        this.currentIndex = elementIndex + 1;
        break;
      }

      case ('prev'): {
        this.currentIndex = elementIndex - 1;
        break;
      }

      case ('first'): {
        this.currentIndex = 0;
        break;
      }

      case ('last'): {
        this.currentIndex = this.otpSize - 1;
        break;
      }
    }

  }

}
