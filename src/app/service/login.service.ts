import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
private loggedInUserId : number= 0;

  constructor() { }

login(userId : number){
  this.loggedInUserId=userId; // on logge un nouveau user
}

logout(): void{
  this.loggedInUserId=0; // on le réinitialise à 0 >> user: Anonymous
}

isLogged(): boolean{
  return (this.loggedInUserId!==0); // si /= 0 >> user connecté
}

getLoggedin(): number{
  return this.loggedInUserId; // retourne l'id de l'user connecté
}

}
