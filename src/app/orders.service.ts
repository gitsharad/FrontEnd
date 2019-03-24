import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Order } from './order';
import { ConfigService } from './config.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private _host = this.config.configuration.host
  private _getOrderUrl = this._host + "getorders"

  constructor(private http: HttpClient, public config: ConfigService) { }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getOrders(data): Observable<Order[]> {
    let httpParams = new HttpParams()
      Object.keys(data).forEach(function (key) {
        httpParams = httpParams.append(key, data[key]);
      });

    return this.http.get<Order[]>(this._getOrderUrl, { params: httpParams })
      .pipe(
        tap(heroes => console.log('fetched orders')),
        catchError(this.handleError('getOrders', []))
      );
  }
}
