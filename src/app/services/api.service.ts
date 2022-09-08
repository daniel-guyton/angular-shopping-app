import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})


export class ApiService {
  constructor(
    private http: HttpClient
  ) {}



  getProducts() {
   return this.http.get<any>(environment.api_gw_url)
    .pipe(map((res: Response) => {
      console.log(res)
      return res;
    }))
  }
}
