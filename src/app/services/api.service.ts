import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
const baseURL = process.env['NG_APP_APP_GW']

@Injectable({
  providedIn: 'root'
})


export class ApiService {
  constructor(
    private http: HttpClient
  ) {}



  getProducts() {
   return this.http.get<any>(baseURL)
    .pipe(map((res: Response) => {
      console.log(res)
      return res;
    }))
  }
}
