import { Injectable } from '@angular/core';
import { InviteContact } from '../entity/InviteContact';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { User } from '../entity/user';
import { Observable, lastValueFrom } from 'rxjs';
import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class InviteService {
  private url = "http://localhost:8888/invites";

  constructor(private httpClient: HttpClient, private userService: UserService, private webSocketService: WebSocketService) { }

  public getAllInvites() {
    return this.httpClient.get(this.url);
  }

  public getReceivedInvites(id: number): Observable<InviteContact[]> {
    return this.httpClient.get<InviteContact[]>(this.url + '/received' + '/' + id)
  }
  public getSendedInvites(id: number): Observable<InviteContact[]> {
    return this.httpClient.get<InviteContact[]>(this.url + '/sended' + '/' + id)
  }

  public updateInvite(invite: InviteContact) {
    const inviteUpdated = {
      status: invite.status,
      viewed: invite.viewed,
      sendBy: invite.sendBy,
      sendTo: invite.sendTo
    }
    return this.httpClient.put<any>(`${this.url}/${invite.id}`, inviteUpdated).subscribe()
  }

  public async createInvite(newInvite: InviteContact) {
    const sendedInviteList = await lastValueFrom(this.getSendedInvites(newInvite.sendBy.id))
    let validInvite: boolean = true
    sendedInviteList.forEach((invite) => {
      if (invite.sendBy.id === newInvite.sendBy.id && invite.sendTo.id === newInvite.sendTo.id && validInvite === true) {

        validInvite = false
      }
    })

    if (validInvite) {


      return this.httpClient.post(this.url, newInvite).subscribe(invite => this.webSocketService.sendInvite(invite as InviteContact)
      )
    }
    return null

  }



  public deleteInvite(invite: InviteContact) {
    //return this.httpClient.delete(this.url + '/' + invite.id).subscribe(invite => this.webSocketService.deleteInvite(invite as InviteContact))
    this.httpClient.delete(this.url + '/' + invite.id).subscribe()
    return this.webSocketService.deleteInvite(invite as InviteContact)
  }

  public acceptInvite(userId: number, contactToAdd: User, invite: InviteContact) {

    //this.deleteInvite(invite.id) // fonctionnel mais pas maj en temps réel.à integrer lors du websocket des invites
    return this.userService.addNewContact(userId, contactToAdd)
  }
}
