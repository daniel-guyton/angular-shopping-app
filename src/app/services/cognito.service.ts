import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
import { Observable } from 'rxjs';

const poolData = {
  UserPoolId: environment.cognito.userPoolId,
  ClientId: environment.cognito.userPoolWebClientId
};

const userPool = new CognitoUserPool(poolData);
@Injectable({
  providedIn: 'root'
})
export class CognitoService {
  cognitoUser: any;
  constructor() {}

  register(email: string, password: string): Observable<any> {
    const attributeList: CognitoUserAttribute[] = [];
    return new Observable(subscriber => {
      userPool.signUp(email, password, attributeList, null!, (err, res) => {
        if (err) {
          console.log('signUp error', err);
          subscriber.error(err);
        }

        this.cognitoUser = res?.user;
        console.log('signUp success', res);
        subscriber.next(res);
        subscriber.complete();
      });
    });
  }

  confirmAuthCode(code: string) {
    const user = {
      Username: this.cognitoUser.username,
      Pool: userPool
    };

    return new Observable(subscriber => {
      const cognitoUser = new CognitoUser(user);
      cognitoUser.confirmRegistration(code, true, (err, res) => {
        if (err) {
          console.log(err);
          subscriber.error(err);
        }
        console.log('confirmAuthCode() sucess', res);
        subscriber.next(res);
        subscriber.complete();
      });
    });
  }

  signIn(email: any, password: any) {
    const authenticationData = {
      Username: email,
      Password: password
    };

    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username: email,
      Pool: userPool
    };

    const cognitoUser = new CognitoUser(userData);

    return new Observable(subscriber => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: res => {
          subscriber.next(res);
          localStorage.setItem('id_token', res.getIdToken().getJwtToken());
          console.log(res);
          subscriber.complete;
        },
        onFailure: err => {
          console.log(err);
          subscriber.error(err);
        }
      });
    });
  }

  isLoggedIn() {
    return userPool.getCurrentUser() != null;
  }

  getAuthenticatedUser() {
    console.log(userPool);
    return userPool.getCurrentUser();
  }

  logOut() {
    this.getAuthenticatedUser()?.signOut();
    this.cognitoUser = null;
  }
}
