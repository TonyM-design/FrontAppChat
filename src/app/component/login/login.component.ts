import { CanalService } from 'src/app/service/canal.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, switchMap, take, throwError } from 'rxjs';
import { User } from 'src/app/entity/user';
import { AuthService } from 'src/app/service/auth.service';
import { NavigationService } from 'src/app/service/navigation.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    imports : [CommonModule,FormsModule],
    standalone: true
})
export class LoginComponent {
  user: User = {
    id: 0, name: '', nickname: '', email: '', password: '', assignedCanals: undefined, badgeColor: '',
    viewMessages: undefined
  };
  showAlert: boolean = false;

  onClickSignIn() {
    this.navigationService.onClickSignIn();
  }
  form: FormGroup;
  constructor(private canalService : CanalService, private fb: FormBuilder, private router: Router, private authService: AuthService, private storageService: StorageService, private navigationService : NavigationService) {
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
      this.canalService.setCanalList()
      return of(userLog);
    }),
      catchError(error => {

        return throwError(error);
      })).subscribe()
  }


}
