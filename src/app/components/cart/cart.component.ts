import { Component, OnInit } from '@angular/core';
import { faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

import { ProductItemWithQty } from 'src/types/types';
import { CognitoService } from '../../services/cognito.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  trash: IconDefinition = faTrash;
  cartItemList: any = [];
  grandTotal!: number;
  handler: any = null;

  constructor(
    private readonly cartService: CartService,
    private readonly router: Router,
    private auth: CognitoService
  ) {}

  ngOnInit(): void {
    var authenticatedUser = this.auth.getAuthenticatedUser();
    if (authenticatedUser == null) {
      return;
    }
    this.loadStripe();
    this.cartService.getUserCart().subscribe((res: ProductItemWithQty[]) => {
      this.cartItemList = res;
      this.getTotalPriceAndItems(this.cartItemList.body);
    });
  }

  pay(amount: any) {
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51Lp04PE7twaRpoQiu4khTsAM4DQ1KvgAHQNR42LxUJT46TksxTrddg2CWwsczZRnhXFpK4KzEVtQB3e2eBHH7EpY00kjSFtjmg',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token);
        alert('Token Created!!');
      }
    });

    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: amount * 100
    });
  }

  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement('script');
      s.id = 'stripe-script';
      s.type = 'text/javascript';
      s.src = 'https://checkout.stripe.com/checkout.js';
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51Lp04PE7twaRpoQiu4khTsAM4DQ1KvgAHQNR42LxUJT46TksxTrddg2CWwsczZRnhXFpK4KzEVtQB3e2eBHH7EpY00kjSFtjmg',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token);
            alert('Payment Success!!');
          }
        });
      };

      window.document.body.appendChild(s);
    }
  }

  handleQuantityChange(event: Event, productObj: ProductItemWithQty): void {
    if (!(event.target instanceof HTMLInputElement)) return;
    const newQuantity = parseInt(event.target.value);
    this.cartService.updateCartQuantity(newQuantity, productObj.product.id).subscribe();
  }

  deleteItemFromCart(product: ProductItemWithQty): void {
    this.cartService
      .deleteProductFromCart(product)
      .subscribe({
        error: err => console.log(err)
      })
      .add(() => {
        const index: number = this.cartItemList.body.indexOf(product);
        if (index !== -1) {
          this.cartItemList.body.splice(index, 1);
        }
        this.getTotalPriceAndItems(this.cartItemList.body);
      });
  }

  getTotalPriceAndItems(cartItemList: any) {
    return {
      totalPrice: cartItemList.reduce(
        (totalPrice: number, cartItem: any) => totalPrice + cartItem.product.price * cartItem.qty,
        0
      ),
      totalItems: cartItemList.reduce((totalItems: any, cartItem: any) => totalItems + cartItem.qty, 0)
    };
  }
  async onBtnClick(): Promise<void> {
    await this.router.navigateByUrl('/products');
  }
}
