import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product, ProductAfter } from '../type/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Khai báo http để có đối tượng HttpClient tương tác với các phương thức của API
  constructor(private http:HttpClient) { }

  // Kiểu dữ liệu Observable sẽ giúp lắng nghe API trả về kq
  getProducts (): Observable<Product[]> {
    return this.http.get<Product[]>(environment.products);
  }
  getProductsByCategory(id: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.products}/proByCate/${id}`);
  }
  getProduct (id: string): Observable<Product> {
    return this.http.get<Product>(`${environment.products}/${id}`);
  }
  
  deleteProduct (id:string): Observable<any> {
    return this.http.delete(`${environment.products}/${id}`);
  }
  createProduct (data: ProductAfter): Observable<Product> {
    return this.http.post<Product>(`${environment.products}/create`, data);
  }
  updateProduct (id: string, data: ProductAfter): Observable<Product> {
    return this.http.patch<Product>(`${environment.products}/${id}`, data);
  }
}