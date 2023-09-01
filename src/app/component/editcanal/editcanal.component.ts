import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval } from 'rxjs';
import { Canal } from 'src/app/entity/canal';
import { CanalService } from 'src/app/service/canal.service';

@Component({
  selector: 'app-editcanal',
  templateUrl: './editcanal.component.html',
  styleUrls: ['./editcanal.component.css']
})
export class EditcanalComponent implements OnInit {
  form: FormGroup ;
  canals: any[] = [];

  constructor(
    private fb : FormBuilder,
    private canalService :CanalService
    ){
      this.form = this.fb.group({
        newcanalname:['', [Validators.required, Validators.maxLength(10)]],
      })
    }

  ngOnInit(): void {
    interval(100).subscribe(()=>
    this.canalService.getAllCanals().subscribe(
      (data)=>{
        this.canals = data
      },
      (error)=>{
        console.error('Erreur : ', error)
      }
    ))
  }


  deleteCanal(canal: Canal) {
    console.log("Try to delete canal :"+canal.name);
    this.canalService.deleteCanal(canal.id).subscribe(
      (response) => {
        console.log('Canal deleted successfully:', response);
      },
      (error) => {
        console.error('Error creating canal:', error);
      }
    );
  }

  updateCanal(canal : Canal){
    console.log("Try to update canal :"+canal.name);
    let newCanal:Canal = new Canal(canal.id, canal.name);
    this.canalService.updateCanal(canal.id, newCanal).subscribe(
      (response) => {
        console.log('Canal updated successfully:', response);
      },
      (error) => {
        console.error('Error creating canal:', error);
      }
    );
  }
    

}
