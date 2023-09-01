import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-addmessage',
  templateUrl: './addmessage.component.html',
  styleUrls: ['./addmessage.component.css']
})
export class AddmessageComponent {
  form : FormGroup;

  constructor(
    private fb : FormBuilder,
    private ms : MessageService,
    private route : Router,
  ){
    this.form=this.fb.group({
      messagecontent:[]
    })
  }

  onClick() {
    console.log(this.form.value)
  this.ms.createMessages(this.form.value.messagecontent).subscribe(
    (response) => {
      console.log('Message created successfully:', response);
      this.form.reset();
      this.route.navigate(['']);
    },
    (error) => {
      console.error('Error creating canal:', error);
    }
  );

}

}
