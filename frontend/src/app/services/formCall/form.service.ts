import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }

  compilepdf(values:any) : Observable<any>{
    return this.http.post<any>('http://localhost:3000/api/v1/submit',{...values})
  }
}
