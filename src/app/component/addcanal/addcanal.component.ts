import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CanalToCreate } from 'src/app/entity/canaltocreate';
import { CanalService } from 'src/app/service/canal.service';

@Component({
  selector: 'app-addcanal',
  templateUrl: './addcanal.component.html',
  styleUrls: ['./addcanal.component.css']
})
export class AddcanalComponent {
form: FormGroup ;

constructor(
    private fb: FormBuilder,
    private cs :  CanalService){
  this.form = this.fb.group({
    canalname:['', [Validators.required, Validators.maxLength(10)]],
    canaldesc:['', [Validators.required, Validators.maxLength(200)]],

  })
}
onClick() {
console.log(this.form.value)
let newCanal = new CanalToCreate(this.form.value.canalname)
// this.cs.createCanal(newCanal);

this.cs.createCanal(newCanal).subscribe(
  (response) => {
    console.log('Canal created successfully:', response);
    // You can perform further actions here
  },
  (error) => {
    console.error('Error creating canal:', error);
  }
);
}

}
