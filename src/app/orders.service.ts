import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Order } from './order';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const apiUrl = "http://ec2-52-15-233-183.us-east-2.compute.amazonaws.com:3000/api/getorders";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getOrders(email): Observable<Order[]> {
    const headers = new HttpHeaders().set("email", email);
    return this.http.get<Order[]>(apiUrl, { headers })
      .pipe(
        tap(heroes => console.log('fetched orders')),
        catchError(this.handleError('getOrders', []))
      );
  }
}
