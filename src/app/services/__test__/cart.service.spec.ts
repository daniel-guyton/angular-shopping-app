import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { dummyUserCart, dummyProduct, dummyProductWithQuantity } from './mockdata';
import { ProductItemWithQty } from 'src/types/types';
import { CartService } from '../cart.service';

describe('CartService', () => {
  let httpMock: HttpTestingController;
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    service = TestBed.inject(CartService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should retrueve products from /getUserCart via GET', () => {
    service.getUserCart().subscribe(cart => {
      expect(cart.length).toBe(1);
      expect(cart).toEqual(dummyUserCart);
    });

    const request = httpMock.expectOne(`https://rdebjc4fkf.execute-api.ap-southeast-2.amazonaws.com/test/getUserCart`);
    expect(request.request.method).toBe('GET');
    request.flush;
  });

  it('should make an HTTP POST to /test', () => {
    service.addToCart(dummyProduct).subscribe(data => expect(data).toEqual(dummyProduct));

    const request = httpMock.expectOne(`https://rdebjc4fkf.execute-api.ap-southeast-2.amazonaws.com/test`);
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual(dummyProduct);

    request.flush;
    // expect(fakeResponse).toEqual(dummyProduct);
  });
  it('should make an HTTP DELETE to /test', () => {
    service
      .deleteProductFromCart(dummyProductWithQuantity)
      .subscribe((products: ProductItemWithQty | null) => expect(products).toEqual(null));

    const request = httpMock.expectOne(
      `https://rdebjc4fkf.execute-api.ap-southeast-2.amazonaws.com/test/${dummyProductWithQuantity.product.id}`
    );
    expect(request.request.method).toEqual('DELETE');

    request.flush;
    // expect(fakeResponse).toEqual(dummyProduct);
  });
  it('should make an HTTP PATCH to /test', () => {
    const newQuantity = {
      quantity: 1,
      product: 1
    };
    service
      .updateCartQuantity(newQuantity.quantity, newQuantity.product)
      .subscribe(response => expect(response).toEqual(newQuantity));

    const request = httpMock.expectOne(`https://rdebjc4fkf.execute-api.ap-southeast-2.amazonaws.com/test`);
    expect(request.request.method).toEqual('PATCH');

    request.flush;
    // expect(fakeResponse).toEqual(dummyProduct);
  });
});
