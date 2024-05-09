import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  scrollEvent: EventEmitter<number> = new EventEmitter<number>();
  constructor(public router: Router) { }


  reloadComponent(self: boolean, urlToNavigateTo?: string) {

    const url = self ? this.router.url : urlToNavigateTo;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/${url}`]).then(() => {

      })
    })
  }

  reloadPage() {
    window.location.reload()
  }
}
