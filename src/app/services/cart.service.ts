import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

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

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  addToCart(product: any) {


    return this.http.post<any>("https://54f87cx2fj.execute-api.ap-southeast-2.amazonaws.com/test", product, this.httpOptions)
    .pipe(map((product): any => {
      this.cartItemList.push(product);
      this.productsList.next(this.cartItemList);
      this.getTotalPrice();
    }))
  }
  getTotalPrice(): any {
    let grandTotal = 0;
    this.cartItemList.map((item: any) => {
      grandTotal += item.price
    })
    return grandTotal
  }
}
