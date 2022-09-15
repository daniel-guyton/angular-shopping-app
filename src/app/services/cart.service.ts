import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItemList: any = [];
  productsList = new BehaviorSubject<any>([]);

  constructor(
    private http: HttpClient
    ) {}

  getProducts() {
    return this.productsList.asObservable()
  }


   addToCart(product: any) {
    this.cartItemList.push(product);
    this.productsList.next(this.cartItemList);
    this.getTotalPrice();
    return this.http.post<any>(process.env.NG_APP_API_GW, product)
    .pipe((): any => {
      console.log('addToCart error')
    })
  }
  getTotalPrice(): any {
    let grandTotal = 0;
    this.cartItemList.map((item: any) => {
      grandTotal += item.price
    })
    return grandTotal
  }
}
