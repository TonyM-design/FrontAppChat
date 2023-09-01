import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../entity/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:8888/users';
  userlogged!: User;



  constructor(private http: HttpClient) {
    this.getUserById(1).subscribe((data) => {
      this.userlogged = data
    })
  }

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
