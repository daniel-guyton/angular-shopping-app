import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/services/cognito.service';
import { User } from 'src/types/types';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  user: User | undefined;
  isConfirmed: boolean = false;
  alertMessage: string = '';
  showAlert: boolean = false;

  constructor(private router: Router, private cognitoService: CognitoService) {}

  ngOnInit(): void {
    this.user = {} as User;
    this.isConfirmed = false;
  }

  public signUpWithCognito() {
    if (this.user && this.user.email && this.user.password) {
      this.cognitoService
        .signUp(this.user)
        .then(() => {
          this.isConfirmed = true;
        })
        .catch((err: any) => this.displayAlert(err.message));
    } else {
      this.displayAlert('Missing email or password');
    }
  }

  public confirmSignUp() {
    if (this.user) {
      this.cognitoService
        .confirmSignUp(this.user)
        .then(() => {
          this.router.navigate(['/sign-in']);
        })
        .catch((err: Error) => this.displayAlert(err.message));
    } else {
      this.displayAlert('Missing user information');
    }
  }

  private displayAlert(message: string) {
    this.alertMessage = message;
    this.showAlert = true;
  }
}
