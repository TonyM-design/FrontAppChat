import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:8080/users';
  userlogged: number=0;
  
  constructor(private http: HttpClient) {}

  createUser(canal: any): Observable<any> {
    return this.http.post(this.url, canal);
  }

  getAllUSers(): Observable<any> {
    return this.http.get(this.url);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

}
