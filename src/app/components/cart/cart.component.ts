import { Component, OnInit } from '@angular/core';
import { faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

import { ProductItemWithQty } from 'src/types/types';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  trash: IconDefinition = faTrash;
  cartItemList: any;
  grandTotal!: number;

  constructor(private readonly cartService: CartService, private readonly router: Router) {}

  ngOnInit(): void {
    this.cartService.getUserCart().subscribe((res: ProductItemWithQty[]) => (this.cartItemList = res));
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
      });
  }

  async onBtnClick(): Promise<void> {
    await this.router.navigateByUrl('/');
  }
}
