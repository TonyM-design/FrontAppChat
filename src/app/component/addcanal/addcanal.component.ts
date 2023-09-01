import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CanalToCreate } from 'src/app/entity/canaltocreate';
import { CanalService } from 'src/app/service/canal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addcanal',
  templateUrl: './addcanal.component.html',
  styleUrls: ['./addcanal.component.css']
})
export class AddcanalComponent {
form: FormGroup ;

constructor(
    private fb: FormBuilder,
    private cs :  CanalService,
    private route: Router){
  this.form = this.fb.group({
    canalname:['', [Validators.required, Validators.maxLength(10)]],
  })
}
onClick() {
// on crée une entité canal à partir de notre formulaire
let newCanal = new CanalToCreate(this.form.value.canalname)
// on crée un canal sur notre bdd grâce à notre service
this.cs.createCanal(newCanal).subscribe(
  (response) => {
    console.log('Canal created successfully:', response);
    // on réinitialise le form
    this.form.reset();
    this.route.navigate(['']);
  },
  (error) => {
    console.error('Error creating canal:', error);
  }
);
}

}
