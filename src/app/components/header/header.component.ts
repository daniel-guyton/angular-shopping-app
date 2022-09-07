import {AfterViewInit, Component} from '@angular/core';
import {faCartShopping, faSearch} from '@fortawesome/free-solid-svg-icons';
import {CartService} from 'src/app/services/cart.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements AfterViewInit {

  totalItems: number = 0
  searchIcon: any = faSearch
  cartIcon: any = faCartShopping
  title: string = 'SHOPPING APP'

  constructor(
    private cartService: CartService,
    private router: Router
  ) {
  }

  ngAfterViewInit(): void {
    this.cartService.getProducts()
      .subscribe((res: any) => {
        return this.totalItems = res.length
      })
  }

  async btnClick() {
    await this.router.navigateByUrl('/cart')
  }
}
