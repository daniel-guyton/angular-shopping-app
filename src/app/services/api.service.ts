import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(
    private http: HttpClient
  ) {}

  getProducts() {
   return this.http.get<any>('https://k6mi58clfb.execute-api.ap-southeast-2.amazonaws.com/test')
    .pipe(map((res: Response) => {
      console.log(res)
      return res;
    }))
  }
}
