import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMonth } from '../interfaces';
import { catchError } from 'rxjs/operators';
import { AlertService } from './common/alert.service';

@Injectable({
  providedIn: 'root'
})
export class MonthsService {
  private monthUrl = 'http://localhost:3000/months';
  constructor(private http: HttpClient, private alertService: AlertService) { }

  getAllMonths(): Observable<IMonth[]> {
    return this.http.get<IMonth[]>(this.monthUrl).pipe(
      catchError((error, caught) => {
        this.alertService.showAlert({ severity: 'error', text: 'Error creating category' });
        return [];
      })
    );
  }
}
