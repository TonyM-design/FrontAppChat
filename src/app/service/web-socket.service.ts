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
    console.log("JOIN ROOM")
    this.clearChatMessageSubject()
    this.stompClient.connect({}, (frame: any) => {
      // a partir d'ici perte de la responseQuote, le message reçu via le subscribe ne contient pas de response quote
      // 
      this.stompClient.subscribe(`/topic/${canalId}`, (message: any) => {
        console.log("déclenchement SUBSCRIBE ")
        console.log(message)
        const messageContent = JSON.parse(message.body);
        console.log(messageContent)
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
