import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  cartItemList = [];

  constructor(
    private http: HttpClient
    ) {}

  deleteProductFromCart(productObj: any) {
    return this.http.delete<any>(`${process.env.NG_APP_API_GW}/${productObj.product.id}`)
    // .pipe((): any => {
    //   console.log('sucess')
    // })
  }
  addToCart(product: any) {
    return this.http.post<any>(process.env.NG_APP_API_GW, product)
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

  updateCartQuantity(quantity: any, product: any) {
    return this.http.patch<any>(process.env.NG_APP_API_GW, {quantity, product})
  }

}
