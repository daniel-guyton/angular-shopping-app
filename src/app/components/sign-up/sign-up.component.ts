import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/services/cognito.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../form.styles.scss']
})
export class SignUpComponent {
  confirmCode: boolean = false;
  codeWasConfirmed: boolean = false;
  error: string = '';
  show: boolean = false;

  constructor(private auth: CognitoService, private _router: Router) {}

  register(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.auth.register(email, password).subscribe({
      next: () => (this.confirmCode = true),
      error: err => {
        console.log(err);
        this.error = 'Registration Error has occued';
      }
    });
  }

  password() {
    this.show = !this.show;
  }

  validateAuthCode(form: NgForm) {
    const code = form.value.code;

    this.auth.confirmAuthCode(code).subscribe({
      next: () => {
        this.codeWasConfirmed = true;
        this.confirmCode = false;
      },
      error: err => {
        console.log(err);
        this.error = 'Confirm Authorization Error has occured';
      }
    });
  }
}
