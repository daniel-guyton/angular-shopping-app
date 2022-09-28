import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ProductItemWithQty, ProductItem } from 'src/types/types';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItemList = [];

  constructor(private readonly http: HttpClient) {}

  deleteProductFromCart = (productObj: ProductItemWithQty): Observable<ProductItemWithQty> =>
    this.http.delete<ProductItemWithQty>(
      `${'https://rdebjc4fkf.execute-api.ap-southeast-2.amazonaws.com/test'}/${productObj.product.id}`
    );

  addToCart = (product: ProductItem): Observable<ProductItem> =>
    this.http.post<ProductItem>('https://rdebjc4fkf.execute-api.ap-southeast-2.amazonaws.com/test', product);

  getUserCart = (): Observable<any> =>
    this.http.get<ProductItemWithQty[]>(
      'https://rdebjc4fkf.execute-api.ap-southeast-2.amazonaws.com/test' + '/getUserCart'
    );

  updateCartQuantity = (quantity: number, product: number): Observable<any> =>
    this.http.patch<never>('https://rdebjc4fkf.execute-api.ap-southeast-2.amazonaws.com/test', {
      qty: quantity,
      product
    });
}
