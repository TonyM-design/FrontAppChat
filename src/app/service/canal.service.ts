import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Canal } from '../entity/canal';

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
  
  deleteCanal(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
    
  }

  updateCanal(id : number, canal :Canal){
    return this.http.put(`${this.url}/${id}`, canal);
  }

}