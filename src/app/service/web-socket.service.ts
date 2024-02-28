import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs'
import * as SockJS from 'sockjs-client';
import { Message } from '../entity/message';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  public stompClient: any;
  private chatMessageSubject: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);

  constructor() {
    this.initializeSocketConnection()
  }
  initializeSocketConnection() {
    const url = "//localhost:8888/chat-socket";
    this.stompClient = Stomp.over(() => new SockJS(url));
  }

  closeConnection() {
    this.stompClient.disconnect()
  }
  joinRoom(canalId: number) {
    this.clearChatMessageSubject()
    this.stompClient.connect({}, (frame: any) => {
      this.stompClient.subscribe(`/topic/${canalId}`, (message: any) => {
        const messageContent = JSON.parse(message.body);
        const currentMessage = this.chatMessageSubject.getValue();
        currentMessage.push(messageContent);
        this.chatMessageSubject.next(currentMessage);
      })
    })
  }
  getMessageSubject() {
    return this.chatMessageSubject.asObservable();
  }

  clearChatMessageSubject() {
    return this.chatMessageSubject.next([]);
  }

  sendMessage(canalId: number, newMessage: Message) {

    return this.stompClient.send(`/app/chat/${canalId}`, {}, JSON.stringify(newMessage));
  }
}
