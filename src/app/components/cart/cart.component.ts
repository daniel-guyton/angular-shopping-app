import {Component, OnInit} from '@angular/core';
import {faTrash, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {CartService} from 'src/app/services/cart.service';
import {Router} from '@angular/router'
import { ProductItem } from 'src/common/types';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  trash: IconDefinition= faTrash
  cartItemList: any;
  grandTotal!: number;

  constructor(
    private cartService: CartService,
    private router: Router,
  ) {
  }



  ngOnInit(): void {
    this.cartService.getUserCart()
    .subscribe((res: Response) => {
      this.cartItemList = res
      console.log(this.cartItemList)
    })
  }

  handleQuantityChange (event: any, productObj: any) {
    console.log(event.target.value)
    // console.log(event.value)
    this.cartService.updateCartQuantity(event.target.value, productObj.id).subscribe({
      error: (err) => console.log(err),
    })
  }

  deleteItemFromCart(product: ProductItem) {
    console.log("This is the product", product)
    this.cartService.deleteProductFromCart(product).subscribe({
      error: (err) => console.log(err),
    }).add(() => {
    console.log("This is the cart item list", this.cartItemList)
        const index: number = this.cartItemList.body.indexOf(product)
        if (index !== -1) {
          this.cartItemList.body.splice(index, 1);
        }
    })
  }

  async onBtnClick() {
    await this.router.navigateByUrl('/')
  }
}
