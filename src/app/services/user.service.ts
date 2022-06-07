import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserAfter } from '../type/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Khai báo http để có đối tượng HttpClient tương tác với các phương thức của API
  constructor(private http:HttpClient) { }

  // Kiểu dữ liệu Observable sẽ giúp lắng nghe API trả về kq
  getUsers (): Observable<User[]> {
    return this.http.get<User[]>(environment.users);
  }

  getUser (id: string): Observable<User> {
    return this.http.get<User>(`${environment.users}/${id}`);
  }
  
  deleteUser (id:string): Observable<any> {
    return this.http.delete(`${environment.users}/${id}`);
  }

  // Dữ liệu gửi đi {name: string}, nhận về {id: number, name: string}
  createUser (data: UserAfter): Observable<User> {
    return this.http.post<User>(`${environment.users}/create`, data);
  }
  updateUser (id: string, data: UserAfter): Observable<User> {
    return this.http.patch<User>(`${environment.users}/${id}`, data);
  }
}
