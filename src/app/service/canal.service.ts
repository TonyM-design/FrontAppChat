import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, forkJoin, lastValueFrom, map, of, switchMap, take } from 'rxjs';
import { Canal } from '../entity/canal';
import { CanalToCreate } from '../entity/canaltocreate';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CanalService {
  private url = 'http://localhost:8888/canals';
  canalUsed!: Canal;
  subjectCanalList = new BehaviorSubject<Canal[]>([])
  canals = this.subjectCanalList.asObservable();
  displayInTable: boolean = false;


  constructor(private http: HttpClient, public authService: AuthService, private storageService: StorageService) {
    this.setCanalList();

  }

  ngOnInit() {
  }

  async setCanalList() {
    let authorizedCanals: Canal[] = [];
    try {
      let canals: Canal[] = await lastValueFrom(this.http.get<Canal[]>(this.url));
      const userLogged = this.storageService.get("userLogged");
      for (const canal of canals) {
        if (canal.users === undefined) {
          const canalIdToDeserialize = canal as unknown;
          const deserializedCanal = await lastValueFrom(this.getCanalById(canalIdToDeserialize as number));

          authorizedCanals.push(deserializedCanal)
        }
        else authorizedCanals.push(canal)

      }


      const filteredCanals = authorizedCanals.filter(
        (canal) => canal.isPublic === true || this.userLoggedIsPresent(canal) === true)
      console.log(filteredCanals)
      this.subjectCanalList.next(filteredCanals)
    }


    catch (error) {
      console.error('An error occurred', error);
      this.subjectCanalList.error('An error occurred');
    }
  }

  userLoggedIsPresent(canal: Canal) {
    const userLogged = this.storageService.get("userLogged");
    if (canal.users.length > 0 && userLogged !== null) {
      for (const user of canal.users) {
        if (user.id === userLogged.id || user === userLogged.id) {
          return true;
        }
      }
    }
    return false;
  }



  createCanal(canal: CanalToCreate): Observable<any> {
    return this.http.post(this.url, canal);
  }



  getAllCanals(): Observable<any> {
    return this.http.get(this.url);
  }

  getCanalById(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  updateCanal(canalToUpdate: Canal): Observable<Canal> {
    return this.http.put<Canal>(`${this.url}/${canalToUpdate.id}`, canalToUpdate)
  }

  deleteCanal(id: number) {
    this.http.delete(`${this.url}/${id}`)
  }

}