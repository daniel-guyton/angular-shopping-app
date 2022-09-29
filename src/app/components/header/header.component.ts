import { AfterViewInit, Component, OnInit } from '@angular/core';
import { faCartShopping, faSearch, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { User } from 'src/types/types';
import { CognitoService } from 'src/app/services/cognito.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  totalItems: number = 0;
  searchIcon: IconDefinition = faSearch;
  cartIcon: IconDefinition = faCartShopping;
  title: string = 'SHOPPING APP';
  user: User | undefined;
  constructor(private router: Router, private cognitoService: CognitoService) {}

  ngOnInit(): void {
    this.cognitoService.getUser().then((user: any) => {
      if (user) {
        console.log(user);
        this.user = user.attributes.given_name;
      } else {
        this.router.navigate(['/sign-in']);
      }
    });
  }

  async btnClick() {
    await this.router.navigateByUrl('/cart');
  }
}
