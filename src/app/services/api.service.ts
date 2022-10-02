import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { map, Observable } from 'rxjs';
import { ProductItem } from 'src/types/types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private readonly http: HttpClient) {}

  // private handleError(error: HttpErrorResponse) {
  //   if (error.status === 0) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong.
  //     console.error(
  //       `Backend returned code ${error.status}, body was: `, error.error);
  //   }
  //   // Return an observable with a user-facing error message.
  //   return throwError(() => new Error('Something bad happened; please try again later.'));
  // }

  getProducts(): Observable<any> {
    return this.http.get<ProductItem[]>(environment.api_gw, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      }
    });
  }
}
