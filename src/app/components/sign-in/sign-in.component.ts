import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faLessThanEqual } from '@fortawesome/free-solid-svg-icons';
import { Auth } from 'aws-amplify';
import { timeStamp } from 'console';
import { CognitoService } from 'src/app/services/cognito.service';
import { User } from 'src/types/types';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  user: User | undefined;
  alertMesage: string = '';
  showAlert: boolean = false;
  isForgotPassword: boolean = false;
  newPassword: string = '';
  constructor(private router: Router, private cognitoService: CognitoService) {}

  ngOnInit(): void {
    this.user = {} as User;

    console.log(Auth.currentAuthenticatedUser());
  }

  signInWithCognito() {
    if (this.user && this.user.email && this.user.password) {
      this.cognitoService
        .signIn(this.user)
        .then(() => {
          this.router.navigate(['/products']);
        })
        .catch((err: any) => this.displayAlert(err.message));
    } else {
      this.displayAlert('Please enter a valid email or password');
    }
  }

  newPasswordSubmit() {
    if (this.user && this.user.code && this.newPassword.trim().length != 0) {
      this.cognitoService
        .forgotPasswordSubmit(this.user, this.newPassword.trim())
        .then(() => {
          this.isForgotPassword = false;
        })
        .catch((err: any) => {
          this.displayAlert(err.message);
        });
    } else {
      this.displayAlert('Please enter Valid input');
    }
  }
  forgotPasswordClicked() {
    if (this.user && this.user.email) {
      this.cognitoService
        .forgotPassword(this.user)
        .then(() => {
          this.isForgotPassword = true;
        })
        .catch((err: any) => this.displayAlert(err.meesage));
    } else {
      this.displayAlert('Please enter a valid email address');
    }
  }
  private displayAlert(message: string) {
    this.alertMesage = message;
    this.showAlert = true;
  }
}
