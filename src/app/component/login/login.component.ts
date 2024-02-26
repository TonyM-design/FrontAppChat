import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, switchMap, take, throwError } from 'rxjs';
import { User } from 'src/app/entity/user';
import { AuthService } from 'src/app/service/auth.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = {
    id: 0, name: '', nickname: '', email: '', password: '', assignedCanals: undefined, badgeColor: '',
    viewMessages: undefined
  };
  showAlert: boolean = false;

  form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private userService: UserService, private authService: AuthService, private storageService: StorageService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }

  /*login() {
    this.authService.login(this.user.email, this.user.password).subscribe(
      (data: any) => {
        this.storageService.set('userLogged', data)
        this.showAlert = true;
        this.router.navigate([''])


      },
      error => {
        alert('Mot de passe ou email incorrect');
      }
    );
  }*/
  login(): void {
    this.authService.login(this.user.email, this.user.password).pipe(take(1), switchMap(userLog => {
      this.storageService.set('userLogged', userLog)
      this.showAlert = true;
      this.router.navigate([''])
      return throwError(null);
    }),
      catchError(error => {
        console.log('erreur login')
        return throwError(error);
      })).subscribe()
  }


}
