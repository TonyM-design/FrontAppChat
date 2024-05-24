import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs'
import * as SockJS from 'sockjs-client';
import { Message } from '../entity/message';
import { BehaviorSubject } from 'rxjs';
import { User } from '../entity/user';
import { InviteContact } from '../entity/InviteContact';
import { UserService } from './user.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  public stompClientContact: any;
  public stompClientCanal: any;
  public stompClientInvite: any;
  private chatMessageSubject: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);

  private contactListSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private contactToDelete: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  private inviteListSubject: BehaviorSubject<InviteContact[][]> = new BehaviorSubject<InviteContact[][]>([]);
  private inviteToDelete: BehaviorSubject<InviteContact | null> = new BehaviorSubject<InviteContact | null>(null);

  constructor(private storageService: StorageService) {
    this.initializeSocketConnection()
  }
  initializeSocketConnection() {
    const url = "//localhost:8888/chat-socket";
    this.stompClientContact = Stomp.over(() => new SockJS(url));
    this.stompClientCanal = Stomp.over(() => new SockJS(url));
    this.stompClientInvite = Stomp.over(() => new SockJS(url));
  }

  closeCanalConnection() {
    this.stompClientCanal.disconnect()
  }
  closeContactConnection() {
    this.stompClientContact.disconnect()
  }
  closeInviteConnection() {
    this.stompClientInvite.disconnect()
  }

  joinRoom(canalId: number) {
    this.clearChatMessageSubject()
    this.stompClientCanal.connect({}, (frame: any) => {
      this.stompClientCanal.subscribe(`/topic/${canalId}`, (message: any) => {
        const messageContent = JSON.parse(message.body);
        const currentMessage = this.chatMessageSubject.getValue();
        currentMessage.push(messageContent);
        this.chatMessageSubject.next(currentMessage);
      })
    })
  }


  // ne se declenche plus aprés le send aucune reception !!
  joinContactRoom(userId: number) {
    console.log("test initialisation joinContactRoom")
    this.stompClientContact.connect({}, (frame: any) => {
      this.stompClientContact.subscribe(`/topic/userContacts/${userId}`, (contact: any) => {
        console.log("déclenchement subscribe joinContactRoom")
        const contactContent = JSON.parse(contact.body);
        const currentContactsList = this.contactListSubject.getValue();
        currentContactsList.push(contactContent);
        console.log(currentContactsList)
        this.contactListSubject.next(currentContactsList);
      });

      this.stompClientContact.subscribe(`/topic/userContacts/delete/${userId}`, (contactToDelete: any) => {
        console.log("demande de suppression joinContactRoom / reponse a la reception du message socket CONTACT")
        const toDelete = JSON.parse(contactToDelete.body)
        this.contactToDelete.next(toDelete)
      })
    });
  }


  joinInviteRoom(userId: number) {
    this.stompClientInvite.connect({}, (frame: any) => {
      this.stompClientInvite.subscribe(`/topic/userInvites/${userId}`, (invite: any) => {
        const inviteContent = JSON.parse(invite.body);
        const currentInvitesList = this.inviteListSubject.getValue();
        currentInvitesList.push(inviteContent);
        this.inviteListSubject.next(currentInvitesList);
      });

      this.stompClientInvite.subscribe(`/topic/userInvites/delete`, async (invite: any) => {
        console.log("demande de suppression / reponse a la reception du message socket INVITE")
        const inviteContent: InviteContact = JSON.parse(invite.body);
        console.log("invite à supprimer : ")
        console.log(inviteContent)
        this.inviteToDelete.next(inviteContent)
        console.log(this.inviteToDelete)

      });
    })
  }

  getMessageSubject() {
    return this.chatMessageSubject.asObservable();
  }
  getContactSubject() {
    return this.contactListSubject.asObservable();
  }
  getContactToDeleteSubject() {
    return this.contactToDelete.asObservable()
  }
  getInviteSubject() {
    return this.inviteListSubject.asObservable();
  }
  getInviteToDeleteSubject() {
    return this.inviteToDelete.asObservable();
  }

  clearChatMessageSubject() {
    return this.chatMessageSubject.next([]);
  }
  clearContactListSubject() {
    return this.contactListSubject.next([]);
  }
  clearInviteListSubject() {
    return this.inviteListSubject.next([]);
  }

  sendMessage(canalId: number, newMessage: Message) {
    return this.stompClientCanal.send(`/app/chat/${canalId}`, {}, JSON.stringify(newMessage));
  }

  sendInvite(invite: InviteContact) {
    this.stompClientInvite.send(`/app/invite/${invite.sendBy.id}`, {}, JSON.stringify(invite))
    return this.stompClientInvite.send(`/app/invite/${invite.sendTo.id}`, {}, JSON.stringify(invite))
  }
  deleteInvite(invite: InviteContact) {
    return this.stompClientInvite.send(`/app/invite/delete`, {}, JSON.stringify(invite))

  }

  addNewContact(user: User, newContact: User) {
    this.stompClientContact.send(`/app/contact/${newContact.id}`, {}, JSON.stringify(user))
    return this.stompClientContact.send(`/app/contact/${user.id}`, {}, JSON.stringify(newContact))
  }
  deleteContact(user: User, contactToDelete: User) {
    this.stompClientContact.send(`/app/contact/delete/${contactToDelete.id}`, {}, JSON.stringify(user))
    return this.stompClientContact.send(`/app/contact/delete/${user.id}`, {}, JSON.stringify(contactToDelete))
  }



}
