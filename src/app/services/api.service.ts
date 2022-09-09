import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})


export class ApiService {
  constructor(
    private http: HttpClient
  ) {}



  getProducts() {
   return this.http.get<any>(process.env.NG_APP_API_GW)
    .pipe(map((res: Response) => {
      console.log(res)
      return res;
    }))
  }
}
