import {Component, OnInit} from '@angular/core';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {CartService} from 'src/app/services/cart.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  trash: any = faTrash
  products: any = []
  grandTotal: any;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {
  }

  deleteItem(product: any) {
    const index: number = this.products.indexOf(product)
    if (index !== -1) {
      this.products.splice(index, 1);
    }
    this.grandTotal = this.cartService.getTotalPrice()
  }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe(res => {
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice()
    })
  }

  async onBtnClick() {
    await this.router.navigateByUrl('/')
  }
}
