import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CanalToCreate } from 'src/app/entity/canaltocreate';
import { CanalService } from 'src/app/service/canal.service';

@Component({
  selector: 'app-addcanal',
  templateUrl: './addcanal.component.html',
  styleUrls: ['./addcanal.component.css']
})
export class AddcanalComponent {
  form: FormGroup;
  showAlert = false;

  constructor(
    private fb: FormBuilder,
    private cs: CanalService,
    private router: Router) {
    this.form = this.fb.group({
      canalname: ['', [Validators.required, Validators.maxLength(25)]],

    })
  }
  onClick() {
    console.log(this.form.value)
    let newCanal = new CanalToCreate(this.form.value.canalname)
    console.log(newCanal)

    this.cs.createCanal(newCanal).subscribe(
      (response) => {
        console.log('Canal created successfully:', response);
        this.showAlert = true;
        setTimeout(() => { this.router.navigate(['/']) }, 2500)
      },
      (error) => {
        console.error('Error creating canal:', error);
      }
    );
  }

}
