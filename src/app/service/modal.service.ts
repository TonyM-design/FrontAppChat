import { ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalComponent } from '../component/modal/modal.component';
import { Canal } from '../entity/canal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  // determine le composant modal a afficher
  public modals: ModalComponent[] = [];

  add(modal: ModalComponent) {
    // unique id 
    console.log("modal " + modal.id)
    console.log(this.modals)
    if (!modal.id || this.modals.find(x => x.id === modal.id)) {

      throw new Error('modal must have a unique id attribute');
    }

    else // add modal to array of active modals
      this.modals.push(modal);
  }

  remove(modal: ModalComponent) {
    // remove modal from array of active modals
    this.modals = this.modals.filter(x => x !== modal);
  }

  open(id: string) {
    console.log("lancement Open() " + id)
    const modal = this.modals.find(modal => modal.id === id);
    console.log(modal)
    if (!modal) {
      throw new Error(`modal '${id}' not found`);
    }

    modal.open();
  }

  openCreateCanalModal(id: string) {
    console.log("lancement openCreateCanalModal() " + id)
    const modal = this.modals.find(x => x.id === id);

    if (!modal) {
      throw new Error(`modal '${id}' not found`);
    }

    modal.open();
  }

  close() {

    const modal = this.modals.find(x => x.isOpen);
    modal?.close();
  }
}
