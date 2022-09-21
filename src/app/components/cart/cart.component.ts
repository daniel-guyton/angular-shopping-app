import {Component, OnInit} from '@angular/core';
import {faTrash, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {CartService} from 'src/app/services/cart.service';
import {Router} from '@angular/router'
import { ApiService } from 'src/app/services/api.service';
import { of } from 'rxjs';

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

  deleteItem(product: any) {
    const index: number = this.cartItemList.indexOf(product)
    if (index !== -1) {
      this.cartItemList.splice(index, 1);
    }
  }

  ngOnInit(): void {
    this.cartService.getUserCart()
    .subscribe((res: Response) => {
      this.cartItemList = res
      console.log(this.cartItemList)
      this.grandTotal = this.cartService.getTotalPrice()
    })
  }

  async onBtnClick() {
    await this.router.navigateByUrl('/')
  }
}
