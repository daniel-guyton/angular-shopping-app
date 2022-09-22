import {Component, OnInit} from '@angular/core';
import {faTrash, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {CartService} from 'src/app/services/cart.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  trash: IconDefinition= faTrash
  public cartItemList: any;
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

  deleteItemFromCart(product: any) {
    this.cartService.deleteProductFromCart(product).subscribe({
      error: (err) => console.log(err),
    }).add(() => {
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
