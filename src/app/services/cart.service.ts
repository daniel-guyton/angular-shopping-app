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
    this.http.delete<ProductItemWithQty>(`${environment.api_gw!}/${productObj.product.id}`);

  addToCart = (product: ProductItem): Observable<ProductItem> =>
    this.http.post<ProductItem>(environment.api_gw!, product);

  getUserCart = (): Observable<any> => this.http.get<ProductItemWithQty[]>(environment.api_gw + '/getUserCart');

  updateCartQuantity = (quantity: number, product: number): Observable<any> =>
    this.http.patch<never>(environment.api_gw!, {
      qty: quantity,
      product
    });
}
