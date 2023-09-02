import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Canal } from '../entity/canal';

@Injectable({
  providedIn: 'root'
})
export class CanalService {
  private url = 'http://localhost:8888/canals';
  canalused!: Canal;


  constructor(private http: HttpClient) {
    this.getCanalById(1).subscribe((data) => { this.canalused = data })
  }

  createCanal(canal: any): Observable<any> {
    console.log("on tente");
    return this.http.post(this.url, canal);
  }

  getAllCanals(): Observable<any> {
    return this.http.get(this.url);
  }

  getCanalById(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  deleteCanal(id: number) {
    this.http.delete(`${this.url}/${id}`)
  }

}