import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../entity/user';
import { UserService } from './user.service';
import { CanalService } from './canal.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private url = 'http://localhost:8080/messages';
  
  constructor(
    private http: HttpClient,
    private us: UserService, 
    private cs: CanalService) {}

  createMessages(content: any) {
    let date = new Date();
    let newMessage = {user :this.us.connectedUser, canal :this.cs.canalUsed, date:date, content: content}
        console.log(this.us.connectedUser);
        console.log(this.cs.canalUsed);
        console.log(date);
        console.log(content);
      
    return this.http.post(this.url, newMessage);
  }

  getAllMessages(): Observable<any> {
    return this.http.get(this.url);
  }

  getMessagesById(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  getMessagesByCanalId(id: number): Observable<any>{
    return this.http.get(`${this.url}/canal/${id}`);
  }



}
