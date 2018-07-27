import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '../interfaces/';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'http://localhost:3000/login';
  constructor(private http: HttpClient, private alertService: AlertService) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<IUser>(this.loginUrl, { username, password }).pipe(
      catchError((error, caught) => {
        this.alertService.showAlert({ severity: 'error', text: 'Error logging in' });
        return undefined;
      })
    );
  }
}
