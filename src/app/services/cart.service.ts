import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { map, Observable } from 'rxjs';

import { ProductItemWithQty, ProductItem } from 'src/types/types';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItemList = [];

  constructor(private readonly http: HttpClient) {}

  deleteProductFromCart = (productObj: ProductItemWithQty): Observable<ProductItemWithQty> =>
    this.http.delete<ProductItemWithQty>(`${process.env.NG_APP_API_GW!}/${productObj.product.id}`);

  addToCart = (product: ProductItem): Observable<ProductItem> =>
    this.http.post<ProductItem>(process.env.NG_APP_API_GW!, product);

  getUserCart = (): Observable<any> => this.http.get<ProductItemWithQty[]>(process.env.NG_APP_API_GW! + '/getUserCart');

  updateCartQuantity = (quantity: number, product: number): Observable<any> =>
    this.http.patch<never>(process.env.NG_APP_API_GW!, {
      qty: quantity,
      product
    });
}
