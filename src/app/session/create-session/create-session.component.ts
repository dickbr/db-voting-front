import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionController } from '@api/controllers/session.controller';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.scss']
})
export class CreateSessionComponent implements OnInit {
  public address: any;

  readonly formCreateSession = new FormGroup({
    name: new FormControl('', Validators.required),
    limit_stock: new FormControl('', Validators.required)
  });

  constructor(
    private ref: MatDialogRef<CreateSessionComponent>,
    @Inject(MAT_DIALOG_DATA) readonly data: any,
    public snackBar: MatSnackBar,

    private sessionController: SessionController
  ) {}

  ngOnInit(): void {
  }

  onAddressSelected(address: any) {
    this.address = address;
  }
  createSession() {
    let body = {...this.formCreateSession.getRawValue(), ...this.address};
    /** send data */
    let responseAPI$ = this.sessionController.save(body);
    responseAPI$.subscribe({
      next: value => {
        if(value?.status === 409) {
          this.ref.close(value.response.message);
        } else {
          this.ref.close('success');
        }
      },
      error: err => {
        this.ref.close('error');
        console.log('obs error', err)
      }
    });
    this.formCreateSession.disable();
  }
  close(){
    this.ref.close();
  }

}
