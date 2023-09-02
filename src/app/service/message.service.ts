import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../entity/user';
import { MessageToCreate } from '../entity/messagetocreate';
import { UserService } from './user.service';
import { CanalService } from './canal.service';
import { Message } from '../entity/message';



@Injectable({

  providedIn: 'root'

})

export class MessageService {

  private url = 'http://localhost:8888/messages';

  constructor(private http: HttpClient, private us: UserService, private cs: CanalService) { }

  createMessages(content: string) {
    let date = new Date();
    const newMessage = { user: { id: this.us.userlogged.id }, canal: { id: this.cs.canalUsed.id }, date: date, content: content }
    console.log(newMessage)/*
    console.log(this.cs.canalUsed);
    console.log(date);
    console.log(content);*/
    return this.http.post(this.url, newMessage);
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