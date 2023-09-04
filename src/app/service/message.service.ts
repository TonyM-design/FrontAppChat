import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../entity/user';
import { MessageToCreate } from '../entity/messagetocreate';
import { UserService } from './user.service';
import { CanalService } from './canal.service';
import { Message } from '../entity/message';



@Injectable({

  providedIn: 'root'

})

export class MessageService {

  private url = 'http://localhost:8080/messages';

  constructor(private http: HttpClient, private us: UserService, private cs: CanalService) { }

  createMessages(content: string): Observable<Object> {
    let date = new Date();
    if (this.us.userlogged) {
      const newMessage = { user: { id: this.us.userlogged.id }, canal: { id: this.cs.canalUsed.id }, date: date, content: content }
      return this.http.post(this.url, newMessage);
    } else {
      return throwError('User not logged in');
    }

  }
  getAllMessages() {
    return this.http.get<Message[]>(this.url);
  }
  getMessagesById(id: number) {
    return this.http.get<Message>(`${this.url}/${id}`);
  }
  getMessagesByCanalId(id: number) {
    return this.http.get<Message[]>(`${this.url}/canal/${id}`);
  }







}