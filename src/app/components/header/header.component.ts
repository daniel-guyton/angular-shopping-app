import {AfterViewInit, Component} from '@angular/core';
import {faCartShopping, faSearch, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {CartService} from 'src/app/services/cart.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements AfterViewInit {

  totalItems: number = 0
  searchIcon: IconDefinition = faSearch
  cartIcon: IconDefinition = faCartShopping
  title: string = 'SHOPPING APP'

  constructor(
    private cartService: CartService,
    private router: Router
  ) {
  }

  ngAfterViewInit(): void {
  }

  async btnClick(): Promise<void> {
    await this.router.navigateByUrl('/cart')
  }
}
