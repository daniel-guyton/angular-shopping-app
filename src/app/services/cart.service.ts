import { HttpClient, HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'

import { ProductItemWithQty, ProductItem } from 'src/common/types'

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItemList = []

  constructor (
    private readonly http: HttpClient
  ) {}

  deleteProductFromCart (productObj: ProductItemWithQty): Observable<HttpResponse<string>> {
    return this.http.delete<any>(`${process.env.NG_APP_API_GW}/${productObj.product.id}`)
  }

  addToCart (product: ProductItem): Observable<any> {
    return this.http.post<any>(process.env.NG_APP_API_GW, product)
      .pipe(map((product): void => {
        console.log(product)
      }))
  }

  getUserCart (): Observable<any> {
    return this.http.get<any>(process.env.NG_APP_API_GW + '/getUserCart')
      .pipe(map((res: any) => {
        console.log(res)
        this.cartItemList = res
        return res
      }))
  }

  updateCartQuantity (quantity: number, product: number): Observable<any> {
    const body = {
      qty: quantity,
      product
    }

    return this.http.patch<any>(process.env.NG_APP_API_GW, body)
  }
}
