import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MessageService } from 'src/app/service/message.service';



@Component({

  selector: 'app-addmessage',

  templateUrl: './addmessage.component.html',

  styleUrls: ['./addmessage.component.css']

})

export class AddmessageComponent {

  form: FormGroup;



  constructor(

    private fb: FormBuilder,

    private ms: MessageService,

  ) {

    this.form = this.fb.group({

      messageContent: ['', {
        validators: [
          Validators.required, Validators.minLength(1)
        ],
      }]

    })

  }



  onClick() {
    if (this.form.value.messageContent !== undefined) {
      this.ms.createMessages(this.form.value.messageContent).subscribe(
        (response) => {
          console.log('Message created successfully:', response);
        },
        (error) => {
          console.error('Error creating canal:', error);
        }
      );
    } else {
      console.error('Message content is undefined');
    }
  }



}