import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../interfaces';
import { catchError } from 'rxjs/operators';
import { AlertService } from './common/alert.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private catUrl = 'http://localhost:3000/categories';
  constructor(private http: HttpClient, private alertService: AlertService) { }

  getCategories() {
    return this.http.get<ICategory[]>(this.catUrl).pipe(
      catchError((error, caught) => {
        this.alertService.showAlert({ severity: 'error', text: 'Error fetching categories' });
        return [];
      })
    );
  }

  createCategory(name: string) {
    return this.http.post<ICategory>(this.catUrl, { name }).pipe(
      catchError((error, caught) => {
        this.alertService.showAlert({ severity: 'error', text: 'Error creating category' });
        return of({ id: -1, name: name });
      })
    );
  }
}
