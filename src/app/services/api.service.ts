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
   return this.http.get<any>(`${process.env['API_GW']}`)
    .pipe(map((res: Response) => {
      console.log(res)
      return res;
    }))
  }
}
