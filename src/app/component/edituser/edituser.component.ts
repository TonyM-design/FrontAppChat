import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, switchMap, take, throwError } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent {
  newEmail?: String;
  emailVerification?: string;
  user = this.storageService.get("userLogged");


  constructor(public userService: UserService, public authService: AuthService, private route: ActivatedRoute, private router: Router, public storageService: StorageService) {
    let id = this.route.snapshot.params['id'];
    if (this.user?.id === id) {
      this.userService.getUserById(id).pipe(take(1)).subscribe((data: any) => {
        this.user = data;
        if (this.user) {
        }
      })
    }

  }

  logout() {
    if (this.user) {
      this.authService.logout();
      alert('vous avez été déconnecté');
      this.router.navigate(['/home']);
    }

  }

  saveChanges() {
    if (this.user) {
      this.userService.updateUser(this.user)
        .pipe(take(1),
          switchMap(updatedUser => {
            this.user = updatedUser;
            alert('Votre profil a été mis à jour.');
            // Retournez un observable vide pour terminer la chaîne
            return throwError(null);
          }),
          catchError(error => {
            alert('Il y a eu une erreur pendant la mise à jour.');
            // Retournez un observable d'erreur pour transmettre l'erreur au composant parent (facultatif)
            return throwError(error);
          })
        )
        .subscribe();
    }
  }

  verifyMailBeforeModify() {
    this.newEmail === this.emailVerification ? true : false;
  }

}
