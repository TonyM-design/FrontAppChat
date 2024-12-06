import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/entity/user';
import { AuthService } from 'src/app/service/auth.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
    selector: 'app-adduser',
    templateUrl: './adduser.component.html',
    styleUrls: ['./adduser.component.css'],
    imports: [CommonModule, ReactiveFormsModule],
    animations: [
        trigger('fadeOut', [
            state('visible', style({
                opacity: 1
            })),
            state('hidden', style({
                opacity: 0,
                display: 'none'
            })),
            transition('visible => hidden', [
                animate('0.3s ease-in-out')
            ])
        ]),
        trigger('fadeInDownAnimation', [
            state('void', style({
                opacity: 0,
                transform: 'translateY(-10px)'
            })),
            state('*', style({
                opacity: 1,
                transform: 'translateY(0)'
            })),
            transition('void => *', animate('0.5s ease-in-out'))
        ]),
    ]
})

export class AdduserComponent {
  user: User = new User(NaN, '', '', '', '', undefined, undefined, '');
  errorMessage: String = ""
  showAlertSuccess: boolean = false;
  showAlertError: boolean = false
  form: FormGroup;
  passwordLengthState: string = 'visible';
  passwordCapitalLetterState: string = 'visible';
  passwordNumberState: string = 'visible';
  passwordSpecialCharacterState: string = 'visible';

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private storageService: StorageService, private us: UserService) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      nickname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?+\-;§=":{}|<>]).+$/)
      ]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordsMatchValidator });
  }

  passwordsMatchValidator = (formGroup: FormGroup) => {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordsMismatch: true };
    } else {
      return null;
    }
  }

  register(event: Event) {
    this.showAlertError = false;
    this.showAlertSuccess = false;

    if (this.form) {
      this.us.createUser(this.form.value).subscribe(
        (data: any) => {
          this.storageService.set("userLogged", data);
          this.showAlertSuccess = true;
          setTimeout(() => { this.router.navigate(['']) }, 2500)
        },
        error => {
          this.showAlertError = true;
          this.errorMessage = error.error
        }
      );
    }
  }


  onPasswordInput() {
    if (this.form.get('password')?.value.length >= 8) {
      this.passwordLengthState = 'hidden';
    } else {
      this.passwordLengthState = 'visible';
    }
    if (/[A-Z]/.test(this.form.get('password')?.value) ===true ) {
      this.passwordCapitalLetterState = 'hidden';
    } else {
      this.passwordCapitalLetterState = 'visible';
    }
    if (/\d/.test(this.form.get('password')?.value) ===true ) {
      this.passwordNumberState = 'hidden';
    } else {
      this.passwordNumberState = 'visible';
    }
    if (/[!@#$%^&*(),.?":{}|<>]/.test(this.form.get('password')?.value) ===true ) {
      this.passwordSpecialCharacterState = 'hidden';
    } else {
      this.passwordSpecialCharacterState = 'visible';
    }


  }


}
