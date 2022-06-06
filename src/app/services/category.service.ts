import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category, CategoryAfter } from '../type/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {

  }
  getCategory (): Observable<Category[]>{
    return this.http.get<Category[]>(environment.category);
  }
  getProduct (id: string): Observable<Category> {
    return this.http.get<Category>(`${environment.category}/${id}`);
  }
  
  deleteProduct (id:string): Observable<any> {
    return this.http.delete(`${environment.category}/${id}`);
  }

  // Dữ liệu gửi đi {name: string}, nhận về {id: number, name: string}
  createProduct (data: CategoryAfter): Observable<Category> {
    return this.http.post<Category>(`${environment.category}/create`, data);
  }
  updateProduct (id: string, data: CategoryAfter): Observable<Category> {
    return this.http.patch<Category>(`${environment.category}/${id}`, data);
  }
}
