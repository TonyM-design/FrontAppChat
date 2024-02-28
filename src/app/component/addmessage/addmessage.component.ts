import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'src/app/entity/message';

import { MessageService } from 'src/app/service/message.service';



@Component({

  selector: 'app-addmessage',

  templateUrl: './addmessage.component.html',

  styleUrls: ['./addmessage.component.css'],
  animations: [
    trigger('fadeInDownAnimation', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(0px)' // Initial position off-screen
      })),
      state('*', style({
        opacity: 1,
        transform: 'translateY(-10px)' // Final position on-screen
      })),
      transition('void => *', animate('0.5s ease-in-out')) // Transition duration and easing
    ]),

  ]


})

export class AddmessageComponent {

  form: FormGroup;
  @Input() messageToDisplay!: Message[];



  constructor(private formBuilder: FormBuilder, public messageService: MessageService,
  ) {

    this.form = this.formBuilder.group({
      messageContent: ['', {
        validators: [
          Validators.required, Validators.minLength(1)
        ],
      }]
    })
  }

  ngOnInit() {

  }

  scrollToEndMessage() {

    const elementToScroll = document.getElementById("artificialEnd")
    elementToScroll?.scrollIntoView({ behavior: "smooth" })

  }

  ngOnDestroy() {
    this.closeResponse()
  }

  closeResponse() {
    this.messageService.subjectMessageToRespond.next(undefined);
  }

  onClick() {
    if (this.form.value.messageContent !== undefined) {
      this.messageService.createMessages(this.form.value.messageContent).subscribe(
        (response) => {
          console.log(response)
        },
        (error) => {
          console.error('Error creating canal:', error);
        }
      );
    } else {
      console.error('Message content is undefined');
    }
    const elementToScroll = document.getElementById("addMessage")
    elementToScroll?.scrollIntoView({ behavior: "smooth" });
    this.form.reset();
  }



}