import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, switchMap, throwError } from 'rxjs';
import { User } from '../entity/user';
import { StorageService } from './storage.service';
import { NavigationEnd, Router } from '@angular/router';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:8888/auth';

  constructor(private http: HttpClient, private storageService: StorageService, private router: Router, private globalService: GlobalService) {

  }
  createUser(user: any): Observable<string> {
    return this.http.post(this.url + '/signin', user, { observe: 'response' }).pipe(
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

  login(email: string, password: string) {
    console.log("declenchement login() AuthService")
    const body = {
      email: email,
      password: password,
    };
    return this.http.post<User>(this.url + '/login', body).pipe(
      switchMap((response) => {
        this.storageService.set("userLogged", response)
        // this.subjectUserLogged.next(response)
        return of(response);
      }),
      catchError((error) => {
        console.error('Impossible de récuperer utilisateur');
        return throwError(error);
      })
    );

  }

  logout() {
    console.log("declenchementLogOut() depuis service Auth")
    this.storageService.remove("userLogged")
    console.log(this.storageService.get('userLogged'))
    //reset page
    this.globalService.reloadPage();
  }



}
