import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/services/cognito.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public _auth: CognitoService, public _router: Router) {}

  goToProducts() {
    this._router.navigateByUrl('/products');
  }
  doLogout() {
    this._auth.logOut();
    this._router.navigateByUrl('/sign-in');
  }
}
