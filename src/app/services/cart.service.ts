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

    headers = new HttpHeaders(
      {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": [
          "POST",
          "GET",
          "OPTIONS",
          "DELETE",
          "PUT",
        ],
        "Access-Control-Allow-Headers": [
          "append",
          "delete",
          "entries",
          "foreach",
          "get",
          "has",
          "keys",
          "set",
          "values",
          "Authorization",
        ],
      }
    )
  addToCart(product: any) {
    return this.http.post<any>(process.env.NG_APP_API_GW, product, {headers: this.headers})
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
