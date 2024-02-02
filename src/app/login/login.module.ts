import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login.component';
import {LoginRoutingModule} from "./login-routing.module";
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
      ReactiveFormsModule,
    MatFormFieldModule,
    CommonModule,
    LoginRoutingModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [LoginComponent]
})
export class LoginModule { }

