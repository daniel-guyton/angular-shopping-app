import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { dummyProducts } from './mockdata';

import { ApiService } from '../api.service';

describe('ApiService', () => {
  let httpMock: HttpTestingController;
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve products from the API via GET', () => {
    service.getProducts().subscribe(products => {
      expect(products.length).toBe(2);
      expect(products).toEqual(dummyProducts);
    });

    const request = httpMock.expectOne(`https://rdebjc4fkf.execute-api.ap-southeast-2.amazonaws.com/test`);

    expect(request.request.method).toBe('GET');

    request.flush(dummyProducts);
  });
});
