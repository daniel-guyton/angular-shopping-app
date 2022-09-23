import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  public products: any;

  constructor(
    private api: ApiService,
    private cartService: CartService
    ) { }

  ngOnInit(): void {
    this.api.getProducts()
      .subscribe((res: Response) => {
        this.products = res
    })
  }

  addToCart(item: any) {
    this.cartService.addToCart(item).subscribe({
      error: (err) => console.log(err)
    })
  }
}
