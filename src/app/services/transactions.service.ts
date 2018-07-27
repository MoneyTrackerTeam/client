import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ITransaction, IUser } from '../interfaces/';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private transUrl = 'http://localhost:3000/transactions';
  constructor(private http: HttpClient, private alertService: AlertService) { }


  getTransactions(): Observable<ITransaction[]> {
    return this.http.get<ITransaction[]>(this.transUrl)
      .pipe(
        catchError((error, caught) => {
          this.alertService.showAlert({ severity: 'error', text: 'Error fetching transactions' });
          return of([]);
        }),
        map(this.transformDateArray)
      );
  }

  getOneTransaction(id: number): Observable<ITransaction> {
    return this.http.get<ITransaction>(`${this.transUrl}/${id}`).pipe(
      catchError((error, caught) => {
        this.alertService.showAlert({ severity: 'error', text: 'Error fetching transaction' });
        return of({});
      }),
      map(this.transformDate)
    );
  }

  createTransaction(transaction: ITransaction): Observable<ITransaction> {
    return this.http.post<ITransaction>(this.transUrl, transaction).pipe(
      catchError((error, caught) => {
        this.alertService.showAlert({ severity: 'error', text: 'Error creating transaction' });
        return of({ id: 0, title: '', amount: 0, date: 0 });
      })
    );
  }

  updateTransaction(transaction: ITransaction): Observable<ITransaction> {
    return this.http.put<ITransaction | any>(`${this.transUrl}/${transaction.id}`, transaction).pipe(
      catchError((error, caught) => {
        this.alertService.showAlert({ severity: 'error', text: 'Error updating transaction' });
        return of({});
      })
    );
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
