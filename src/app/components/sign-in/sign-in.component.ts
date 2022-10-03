import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/services/cognito.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../form.styles.scss']
})
export class SignInComponent {
  emailVerificationMessage: boolean = false;

  constructor(private auth: CognitoService, private _router: Router) {}

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.auth.signIn(email, password).subscribe({
      next: () => this._router.navigateByUrl('/'),
      error: () => (this.emailVerificationMessage = true)
    });
  }
}
