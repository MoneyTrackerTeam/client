import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../interfaces';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private catUrl = 'http://localhost:3000/categories';
  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<ICategory[]>(this.catUrl);
  }

  createCategory(name: string) {
    return this.http.post<ICategory>(this.catUrl, { name });
  }
}
