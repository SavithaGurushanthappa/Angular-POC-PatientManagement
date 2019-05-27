import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders }    from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Http, Response } from "@angular/http";
import { HttpClientModule } from '@angular/common/http';
 import { HttpModule } from '@angular/http';
import { Observable, of } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class PatientService {
 
  constructor(private http: HttpClient,) { }


  getPatients ():Observable<any> {
    console.log("hitted");
    
    return this.http.get("http://localhost:8011/getAllPatient")
  
  }

  createPatient(gender, name, mobile) :Observable<any>{
    console.log("create hitted", gender);
    
    let body = {
      "name":name ,
      "gender": gender,
      "mobile":mobile,
    }
 return this.http.post("http://localhost:8011/createPatient",body, httpOptions)

  }

}
