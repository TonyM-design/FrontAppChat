import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanalService {
  private url = 'http://localhost:8080/canals';
  canalusedId: number = 1;

  
  constructor(private http: HttpClient) {}

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
  
  deleteCanal(id: number){
    this.http.delete(`${this.url}/${id}`)
  }

}