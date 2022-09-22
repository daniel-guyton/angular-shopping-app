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



  deleteProductFromCart(product: any) {
    return this.http.delete<any>(`${"https://hydn41hyd8.execute-api.ap-southeast-2.amazonaws.com/test"}/${product.id}`)
    // .pipe((): any => {
    //   console.log('sucess')
    // })
  }
  addToCart(product: any) {
    const headers = new HttpHeaders(
      {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
      }
    )
    return this.http.post<any>("https://hydn41hyd8.execute-api.ap-southeast-2.amazonaws.com/test", product, {...headers})
    .pipe(map((product): any => {
      console.log(product)
    }))
  }

  getUserCart() {
    return this.http.get<any>("https://hydn41hyd8.execute-api.ap-southeast-2.amazonaws.com/test" + '/getUserCart')
    .pipe(map((res: any) => {
      console.log(res)
      this.cartItemList = res
      return res;
    }))
  }

}
