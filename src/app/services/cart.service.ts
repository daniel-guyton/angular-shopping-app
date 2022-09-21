import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  cartItemList: any = [];

  constructor(
    private http: HttpClient
    ) {}



  addToCart(product: any) {
    const headers = new HttpHeaders(
      {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
      }
    )
    return this.http.post<any>(process.env.NG_APP_API_GW, product, {...headers})
    .pipe(map((product): any => {
      console.log(product)
    }))
  }

  getUserCart() {
    return this.http.get<any>(process.env.NG_APP_API_GW + '/getUserCart')
    .pipe(map((res: any) => {
      console.log(res)
      this.cartItemList = res
      return res;
    }))
  }

  getTotalPrice(): number {
    return this.cartItemList.reduce((total: number, item: any) => total + (item.product.price * item.qty), 0)
  }
}
