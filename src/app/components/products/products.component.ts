import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { CognitoService } from 'src/app/services/cognito.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products: any;

  constructor(private api: ApiService, private cartService: CartService, public auth: CognitoService) {}

  ngOnInit() {
    if (!localStorage.getItem('id_token')) {
      return;
    }
    this.api.getProducts().subscribe((res: Response) => {
      this.products = res;
    });
  }

  addToCart(item: any) {
    this.cartService.addToCart(item).subscribe({
      error: err => console.log(err)
    });
  }

  // signOutWithCognito() {
  //   this.cognitoService.signOut().then(() => {
  //     this.router.navigate(['/sign-in']);
  //   });
  // }
}
