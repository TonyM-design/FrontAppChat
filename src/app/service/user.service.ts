import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, async, catchError, from, last, lastValueFrom, map, mergeMap, of, switchMap, take, throwError, toArray } from 'rxjs';
import { User } from '../entity/user';
import { StorageService } from './storage.service';
import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:8888/users';

  // contient tout les contacts 
  subjectUserList = new BehaviorSubject<User[]>([]);
  userError: String = "";

  constructor(private http: HttpClient, private storageService: StorageService, private webSocketService: WebSocketService) {
    this.setUsers();
  }

  async setUsers() {
    let authorizedUsers: User[] = [];
    try {
      let users: User[] = await lastValueFrom(this.http.get<User[]>(this.url));
      for (const user of users) {
        authorizedUsers.push(user)
      }
    }
    catch (error) {
      console.error('An error occurred', error);
      this.subjectUserList.error('An error occurred');
    }
    this.subjectUserList.next(authorizedUsers)


  }


  async unifyContactsUser() {
    (await lastValueFrom(this.subjectUserList)).forEach(user => {

      if (user.contactOf !== undefined) {
        user.contacts = user.contacts?.concat(user.contactOf);

      }
    }
    )
  }

  // version originale
  /*async setUsers() {
    let authorizedUsers: User[] = [];
    try {
      let users: User[] = await lastValueFrom(this.http.get<User[]>(this.url));
      this.rowUserList = users
      for (const user of users) {
        if (user.email === undefined) {
          const userIdToDeserialize = user as unknown;
          const deserializedUser = await lastValueFrom(this.getUserById(userIdToDeserialize as number));
          authorizedUsers.push(deserializedUser)
        }
        else authorizedUsers.push(user)
      }
      this.subjectUserList.next(authorizedUsers)
    }
    catch (error) {
      console.error('An error occurred', error);
      this.subjectUserList.error('An error occurred');
    }
  }
*/




  // version getUserbyId return Observable
  async deserializeUser2(user: User) {
    if (user.id === undefined) {
      const userIdToSearch = user as unknown as number;

      const deserialized = await lastValueFrom(this.getUserById(userIdToSearch));

      user = deserialized
      return user
    }
    else return user
  }

  createUser(user: any): Observable<string> {
    return this.http.post(this.url, user, { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        if (response.status === 201) {
          return 'Utilisateur créé avec succès';
        } else if (response.status === 400) {
          return response.body as string;
        } else if (response.status === 409) {
          return " Échec de la création de l\'utilisateur : Utilisateur existant " + response.body;
        } else {
          return 'Une erreur inattendue s\'est produite';
        }
      })
    );
  }

  updateUser(user: User): Observable<User> {
    let id = user.id
    return this.http.put<User>(this.url + '/' + id, user);
  }

  getAllUSers(): Observable<any> {
    return this.http.get(this.url);
  }
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }
  getContactsById(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/${id}/contacts`);
  }
  getContactOfById(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/${id}/contactOf`);
  }
  getUsersByCanalId(canalId: number): Observable<any> {
    return this.http.get<User>(`${this.url}/associate/${canalId}`);
  }


  async addNewContact(userId: number, contactToAdd: User) {
    const user = await lastValueFrom(this.getUserById(userId))
    return this.http.post(this.url + "/addContact/" + userId, contactToAdd, { observe: 'response' }).pipe(
      switchMap((response) => {
        this.webSocketService.addNewContact(user, contactToAdd)
        return of(response);
      }),
      catchError((error) => {
        console.error('Erreur innatendue :');
        console.error(error)
        return throwError(error);
      })
    ).subscribe();
  }

  // a des fin de test uniquement 
  /*async addNewContact(userId: number, contactToAdd: User) {
    const user = await lastValueFrom(this.getUserById(userId))
    this.webSocketService.addNewContact(user, contactToAdd)

  }*/

  addNewContact2(newContact: User) {
    let user = this.storageService.get("userLogged");
    this.storageService.get("userLogged").contacts?.push(newContact)
    if (this.storageService.get("userLogged")) {
      this.updateUser(user)
        .pipe(
          take(1),
          switchMap((updatedUser: User) => {
            this.storageService.set("userLogged", updatedUser)
            alert('CONTACT AJOUTE : ' + newContact.name);
            return of(updatedUser);
          }),
          catchError(error => {
            alert('Il y a eu une erreur pendant la mise à jour.');
            return throwError(error);
          })
        )
        .subscribe();
    }
  }


  async removeContact(contactToRemove: User) {
    const userLogged: User = this.storageService.get("userLogged")
    return this.http.delete(this.url + "/removeContact/" + userLogged.id, { body: contactToRemove }).pipe(
      switchMap((response) => {
        this.webSocketService.deleteContact(userLogged, contactToRemove)
        return of(response);
      }),
      catchError((error) => {
        console.error('Erreur innatendue :');
        return throwError(error);
      })
    ).subscribe();
  }

}
