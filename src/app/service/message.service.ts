import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, forkJoin, lastValueFrom, map, mergeMap, of, switchMap, throwError } from 'rxjs';
import { User } from '../entity/user';
import { UserService } from './user.service';
import { CanalService } from './canal.service';
import { Message } from '../entity/message';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';
import { Stomp } from '@stomp/stompjs'
import * as SockJS from 'sockjs-client';
import { WebSocketService } from './web-socket.service';



@Injectable({

  providedIn: 'root'

})

export class MessageService {

  private url = 'http://localhost:8888/messages';
  allMessageList!: Message[];
  subjectMessageLists: Record<number, BehaviorSubject<Message[]>> = {};

  messageToDisplay!: Message[];
  subjectMessageToDisplay = new BehaviorSubject<Message[]>([])

  subjectMessageToRespond = new BehaviorSubject<Message | undefined>(undefined);

  messagePagesCounter: number = 0;


  constructor(private webSocketService: WebSocketService, private http: HttpClient, private userService: UserService, private canalService: CanalService, private authService: AuthService, private storageService: StorageService) {

  }

  selectMessageToRespond(id: number): String {
    let message = this.getMessagesById(id)
    return '';
  }

  setMessageList() {
    this.allMessageList = []
    this.http.get<Message[]>(this.url).pipe(
      catchError(() => {

        return [];
      }),
      map((messages) => {
        return messages;
      })
    )
      .subscribe((messages) => {
        this.allMessageList = messages;
      });


  }




  async initializeMessageToDisplay(canalId: number) {
    if (this.messageToDisplay === undefined) {
      this.messageToDisplay = await lastValueFrom(this.getAnyNumberLastMessageByCanalId(canalId, 15))
    }
    else {
      const messagesToAdd = await lastValueFrom(this.getAnyNumberLastMessageByCanalId(canalId, 15))
      for (const message of messagesToAdd) {
        this.messageToDisplay.push(message)
        console.log(message.date)
      }
    }

    this.messagePagesCounter++;
    this.messageToDisplay.sort((message1, message2) => {
      return parseInt(message1.date.toString()) - parseInt(message2.date.toString());
    })
    console.log(this.messageToDisplay)
    return this.messageToDisplay;
  }




  createMessages(content: string): Observable<Object> {
    console.log("declenchement createMessage()")
    let date = new Date();
    if (this.storageService.get('userLogged')) {
      let newMessage: any
      if (this.subjectMessageToRespond.getValue() === undefined) {
        newMessage = {
          user: { id: this.storageService.get('userLogged').id },
          canal: { id: this.canalService.canalUsed.id },
          date: date,
          content: content,
        };
      }
      else if (this.subjectMessageToRespond.getValue() !== undefined) {
        newMessage = {
          user: { id: this.storageService.get('userLogged').id },
          canal: { id: this.canalService.canalUsed.id },
          date: date,
          content: content,
          responseQuote: this.subjectMessageToRespond.getValue()
        };
        newMessage.responseQuote.canal = newMessage.responseQuote.canal.id
      }

      console.log(newMessage) // ok
      return this.http.post(this.url, newMessage).pipe(
        switchMap((response) => {
          this.messageToDisplay.push(newMessage)
          console.log(this.messageToDisplay)

          // envois du message via websocket en plus du systeme bdd IMPORTANT
          this.webSocketService.sendMessage(this.canalService.canalUsed.id, newMessage)

          // clear subjectMessageToRespond 
          this.subjectMessageToRespond.next(undefined)
          return of(response);
        }),
        catchError((error) => {
          console.error('Erreur lors de la création du message :');
          return throwError(error);
        })
      );
    } else {
      return throwError('User not logged in');
    }
  }



  async getUsersCanal(canalId: number) {
    try {
      let messages: Message[] = await lastValueFrom(this.http.get<Message[]>(`${this.url}/canal/${canalId}`));
      let usersMessages: Set<number> = new Set();
      let usersInCanal: User[] = [];

      messages.forEach((message) => {
        if (message.user.id !== undefined) {
          usersMessages.add(message.user.id);
        }
      });
      for (const id of usersMessages) {
        const user = await lastValueFrom(this.userService.getUserById(id));
        usersInCanal.push(user);
      }
      return usersInCanal;

    } catch (error) {
      console.error('An error occurred', error);
      return new Array()

    }
  }

  getAllMessages() {
    return this.http.get<Message[]>(this.url);
  }
  getMessagesById(id: number) {
    return this.http.get<Message>(`${this.url}/${id}`);
  }
  getMessagesByCanalId(id: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.url}/canal/${id}`);
  }
  async getLastMessageByCanalId(id: number) {
    const messagesByCanalId = await lastValueFrom(this.http.get<Message[]>(`${this.url}/canal/${id}`));
    return messagesByCanalId[messagesByCanalId.length - 1]
  }

  getAnyNumberLastMessageByCanalId(canalId: number, size: number): Observable<Message[]> {
    const params = new HttpParams()
      .set('page', this.messagePagesCounter.toString())
      .set('size', size.toString());

    return this.http.get<Message[]>(`${this.url}/canal/${canalId}/test`, { params });
  }

}