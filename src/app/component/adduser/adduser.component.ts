import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/entity/user';
import { AuthService } from 'src/app/service/auth.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent {
  user: User = new User(NaN, '', '', '', '', undefined, undefined, '');
  errorMessage: String = ""
  showAlertSuccess: boolean = false;
  showAlertError: boolean = false
  form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private storageService: StorageService, private us: UserService) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      nickname: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(10)]],
    });
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




}
