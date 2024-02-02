import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientController } from '@api/controllers/client.controller';
import { UserService } from '@api/services/user.service';

@Component({
 selector: 'login',
 templateUrl: './login.component.html',
 styleUrls: ['./login.component.scss']
})
export class LoginComponent {
 title = 'login';
 showCreateUserFields = false; 

  readonly formCreateUser = new FormGroup({
    cpf: new FormControl('', Validators.required),
    name: new FormControl(''),
    email: new FormControl('', [Validators.email]),
    password: new FormControl('')
  });


 constructor(  
    private clientController: ClientController,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
  }


  createUser() {
     const cpfControl = this.formCreateUser.get('cpf');
      if (cpfControl && cpfControl.value && cpfControl.value.length >= 11) {
        const numericCpf = cpfControl.value.replace(/\D+/g, '');
        let body = {cpf:numericCpf};
        this.clientController.save(body).subscribe({
          next: value => {
            this.userService.setUserId(value.id);
            this.router.navigate(['/sessions']);
          },
          error: err => {
            console.log('Error checking user', err);
          }
        });
      }
  }
}