import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ITransaction, IUser } from '../interfaces/';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private transUrl = 'http://localhost:3000/transactions';
  constructor(private http: HttpClient) { }
  getTransactions(): Observable<ITransaction[]> {
    return this.http.get<ITransaction[]>(this.transUrl)
      .pipe(
        map(this.transformDateArray)
      );
  }

  getOneTransaction(id: number): Observable<ITransaction> {
    return this.http.get<ITransaction | any>(`${this.transUrl}/${id}`).pipe(
      map(this.transformDate)
    );
  }

  createTransaction(transaction: ITransaction): Observable<ITransaction> {
    return this.http.post<ITransaction | any>(this.transUrl, transaction);
  }

  updateTransaction(transaction: ITransaction): Observable<ITransaction> {
    return this.http.put<ITransaction | any>(`${this.transUrl}/${transaction.id}`, transaction);
  }

  deleteTransaction(id: number): Observable<any> {
    return this.http.delete(`${this.transUrl}/${id}`);
  }

  transformDateArray(v: ITransaction[]): ITransaction[] {
    v.map((t) => {
      const d = new Date(+t.date);
      t.readableDate = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
      t.readableTime = `${d.getHours()}:${d.getMinutes() <= 0 ? '0' + d.getMinutes().toString() : d.getMinutes()}`;
      return t;
    });
    return v;
  }
  transformDate(v: ITransaction): ITransaction {
    const d = new Date(+v.date);
    v.readableDate = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    v.readableTime = `${d.getHours()}:${d.getMinutes() <= 0 ? '0' + d.getMinutes().toString() : d.getMinutes()}`;
    return v;
  }
}
