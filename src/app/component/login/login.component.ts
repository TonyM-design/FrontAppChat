import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/entity/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: User = { id: 0, name: '', nickname: '', email: '', password: '', isLogged: false };

  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private us: UserService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }

  currentUser = this.us.userlogged
  login() {
    this.us.login(this.user.email, this.user.password).subscribe(
      (data: any) => {
        this.currentUser = data;
        if (this.currentUser) {
          this.router.navigate(['/userProfil', this.currentUser.id]);
        }
      },
      error => {
        alert('Mot de passe ou email incorrect');
      }
    );
  }

  // listuser:User[]=[];

  // @Output() valeurEmittee = new EventEmitter<any>();

  // login() {

  //   this.us.getAllUSers().subscribe((data)=> this.listuser=data)

  //  for(let i=0 ; i<this.listuser.length;i++){
  //   if(this.listuser[i].email==this.user.email && this.listuser[i].password==this.user.password)
  //   {
  //     console.log('true') ;
  //     this.valeurEmittee.emit(this.listuser[i]);
  //     this.router.navigate(['/userProfil']);
  //     break;

  //   }
  //   else{
  //     console.log('false') ;

}
