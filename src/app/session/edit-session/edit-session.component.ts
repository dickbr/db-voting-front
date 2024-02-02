import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import { SessionController } from '@api/controllers/session.controller';

@Component({
  selector: 'app-edit-session',
  templateUrl: './edit-session.component.html',
  styleUrls: ['./edit-session.component.scss']
})
export class EditSessionComponent implements OnInit {
  public sessionName: string = '';
  public address:any;

  public formGeneral = this.fb.group({
    name: new FormControl('', Validators.required),
    limit_stock: new FormControl('', Validators.required),
  });

  public isLoading = true;

  public sessionId: string = this.route.snapshot.params['session'];

  constructor(
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    readonly router: Router,
    private sessionController: SessionController,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getSession()

    this.isLoading = false;
  }


  getSession() {
    if(this.sessionId){
      let get$ = this.sessionController.get(this.sessionId);
      get$.subscribe({
        next: value => {
          this.formGeneral.patchValue({
            name: value.name,
            limit_stock: value.limit_stock,
          });
          this.sessionName = value.name;
          this.address = {
            street: value['street'] || '',
            city: value['city'] || '',
            neighborhood: value['neighborhood'] || '',
            state: value['state'] || '',
            zipcode: value['zipcode'] || '',
          }
        },
        error: err => {
          console.log('obs error', err)
        }
      });
    }
  }

  submit() {
    const formData = this.formGeneral.getRawValue();

    this.sessionController
        .update(formData, this.sessionId).subscribe({
            next: value => {
              this.router.navigate([`../`], {
                relativeTo: this.route
              });
            },
            error: err => {
              console.log('obs error', err)
              this.notify('Oops! Something went wrong');
            }
        });
  }

  private notify(message: string, action: string = '', duration: number = 6000) {
    this.snackBar.open(message, action, { duration: duration });
  }
}
