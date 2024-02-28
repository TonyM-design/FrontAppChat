import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, async, catchError, lastValueFrom, map } from 'rxjs';
import { User } from '../entity/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:8888/users';
  subjectUserLogged = new BehaviorSubject<User | undefined>(undefined);
  userList: User[] = [];
  subjectUserList = new BehaviorSubject<User[]>([])
  userError: String = "";





  constructor(private http: HttpClient) {
    this.setUsers();


  }

  async setUsers() {
    let authorizedUsers: User[] = [];
    try {
      let users: User[] = await lastValueFrom(this.http.get<User[]>(this.url));
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


  async deserializeUsers(users: User[]) {
    const deserializedUsers = users.map(async user => {
      if (user.email === undefined) {
        const userIdToSearch = user as unknown as number;
        return await lastValueFrom(this.getUserById(userIdToSearch));
      } else {
        return user;
      }
    });
    return deserializedUsers
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

  getUsersByCanalId(canalId: number): Observable<any> {
    return this.http.get<User>(`${this.url}/associate/${canalId}`);
  }

  isUserAlreadyExist(email: String): Boolean {
    for (const user of this.userList) {
      if (user.email == email) {
        this.userError = " Adresse mail déjà utilisé ";
        return true;
      }
    }
    return false;
  }

}
