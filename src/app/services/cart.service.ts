import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ProductItemWithQty, ProductItem } from 'src/types/types';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItemList = [];

  constructor(private readonly http: HttpClient) {}

  deleteProductFromCart = (productObj: ProductItemWithQty): Observable<ProductItemWithQty> =>
    this.http.delete<ProductItemWithQty>(`${global.env['NG_APP_API_GW'] as string}/${productObj.product.id}`);

  addToCart = (product: ProductItem): Observable<ProductItem> =>
    this.http.post<ProductItem>(global.env['NG_APP_API_GW'] as string, product);

  getUserCart = (): Observable<any> =>
    this.http.get<ProductItemWithQty[]>((global.env['NG_APP_API_GW'] as string) + '/getUserCart');

  updateCartQuantity = (quantity: number, product: number): Observable<any> =>
    this.http.patch<never>(global.env['NG_APP_API_GW'] as string, {
      qty: quantity,
      product
    });
}
