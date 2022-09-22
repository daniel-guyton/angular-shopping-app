import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  cartItemList = [];

  constructor(
    private http: HttpClient
    ) {}

  deleteProductFromCart(productObj: any) {
    return this.http.delete<any>(`${"https://frbd4qoyy7.execute-api.ap-southeast-2.amazonaws.com/test"}/${productObj.product.id}`)
  }
  addToCart(product: any) {
    return this.http.post<any>("https://frbd4qoyy7.execute-api.ap-southeast-2.amazonaws.com/test", product)
    .pipe(map((product): any => {
      console.log(product)
    }))
  }

  getUserCart() {
    return this.http.get<any>("https://frbd4qoyy7.execute-api.ap-southeast-2.amazonaws.com/test" + '/getUserCart')
    .pipe(map((res: any) => {
      console.log(res)
      this.cartItemList = res
      return res;
    }))
  }


  updateCartQuantity(quantity: number, product: number): Observable<any> {
    console.log('quantity', typeof quantity)
    console.log('proudct', typeof product)
    const body = {
      qty: quantity,
      product
    }

    return this.http.patch<any>("https://frbd4qoyy7.execute-api.ap-southeast-2.amazonaws.com/test", body)
  }
}
