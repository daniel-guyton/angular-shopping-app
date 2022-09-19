import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItemList: any = [];
  productsList = new BehaviorSubject<any>([]);

  constructor(
    private http: HttpClient
    ) {}

  getProducts(): Observable<number | string>{
    return this.productsList.asObservable()
  }


  addToCart(product: any) {
    const headers = new HttpHeaders(
      {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
      }
    )
    return this.http.post<any>(process.env.NG_APP_API_GW, product, {...headers})
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
