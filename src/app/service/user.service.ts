import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../entity/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:8888/users';
  userlogged!: User | undefined;



  constructor(private http: HttpClient) {
      let tmp=this.userlogged.id;
    this.getUserById(tmp).subscribe((data) => {
      console.log(data);
    })
  }

  createUser(user: any): Observable<any> {
    return this.http.post(this.url, user);
  }

  login(email: string, password: string) {
    const body = {
      email: email,
      password: password,
    };
    return this.http.post(this.url + '/signIn', body);
  }

  logout() {
    this.userlogged = undefined;
  }
  updateUser(user: User): Observable<User> {
    console.log(user);
    let id = user.id
    return this.http.put<User>(this.url + '/' + id, user);
  }

  getAllUSers(): Observable<any> {
    return this.http.get(this.url);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

}
