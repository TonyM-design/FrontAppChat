import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../entity/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:8080/users';
  userlogged: number=0;
  connectedUser !:User;
  
  constructor(private http: HttpClient) {
    // Initialisation de l'utilisateur par défaut ) l'id 0 >> Anonymous
    this.getUserById(0).subscribe((data)=>{
      this.connectedUser=data
    })
  }

  createUser(user: any): Observable<any> {
    return this.http.post(this.url, user);
  }

  getAllUSers(): Observable<any> {
    return this.http.get(this.url);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

}
