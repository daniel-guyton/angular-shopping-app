import { Injectable } from '@angular/core';
import { Amplify, API, Auth } from 'aws-amplify';
import { environment } from 'src/environments/environment';
import { User } from 'src/types/types';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
@Injectable({
  providedIn: 'root'
})
export class CognitoService {
  constructor() {
    Amplify.configure({
      Auth: {
        ...environment.cognito,
        ...environment.oauth
      },
      API: {
        endpoints: [
          {
            endpoint: 'https://z3u5kppbcc.execute-api.ap-southeast-2.amazonaws.com/test',
            custom_header: async () => {
              return { Authorization: (await Auth.currentUserPoolUser()).signInUserSession.idToken.jwtToken };
            }
          }
        ]
      }
    });
  }

  public signUp(user: User): Promise<any> {
    return Auth.signUp({
      username: user.email,
      password: user.password,
      attributes: {
        email: user.email,
        given_name: user.givenName,
        family_name: user.familyName
      }
    });
  }

  public confirmSignUp(user: User): Promise<any> {
    return Auth.confirmSignUp(user.email, user.code);
  }

  // method returns user info if any user is logged in with valied email and password
  //logged in with valied email and password
  public getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }

  public signIn(user: User): Promise<any> {
    return Auth.signIn(user.email, user.password);
  }

  public signOut(): Promise<any> {
    return Auth.signOut();
  }

  public forgotPassword(user: User): Promise<any> {
    return Auth.forgotPassword(user.email);
  }

  public forgotPasswordSubmit(user: User, new_password: string): Promise<any> {
    return Auth.forgotPasswordSubmit(user.email, user.code, new_password);
  }
}
