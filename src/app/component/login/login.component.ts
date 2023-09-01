import { Component } from '@angular/core';
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
  user: User = { id: 0, name: '', nickname: '', email: '', password: '' };

  form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private us: UserService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }
  listuser:User[]=[];
  login() {

    this.us.getAllUSers().subscribe((data)=> this.listuser=data)
    // this.us.signIn(this.user.email, this.user.password).subscribe((reponse) => {
    //   console.log(reponse);
    //   if (reponse == true) {
    //     this.router.navigate(['/userProfil']);
    //   } else {
    //     alert('Mot de passe ou email incorrect');
    //   }

    // });

   for(let i=0 ; i<this.listuser.length;i++){
    if(this.listuser[i].email==this.user.email && this.listuser[i].password==this.user.password)
    {
      console.log('true') ;
      break;
    }
    else{
      console.log('false') ;
      
    }
   }
  }


}
