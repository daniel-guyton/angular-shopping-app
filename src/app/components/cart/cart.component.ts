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
  products: any = []
  grandTotal: any;

  constructor(
    private cartService: CartService,
    private router: Router,
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
    // this.cartService.getProducts().subscribe((res) => {
    //   this.products = res;
    //   this.grandTotal = this.cartService.getTotalPrice()
    // }, (error) => {
    //   throw Nerw

      this.cartService.getUserCart().subscribe({
        next: (res) => {
        this.products = res
        this.grandTotal = this.cartService.getTotalPrice()
      },
      error: (err) => console.error(err)})
  }



  async onBtnClick() {
    await this.router.navigateByUrl('/')
  }
}
