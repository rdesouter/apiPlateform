import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private redirectorUrl:string;

  constructor(
    private http: HttpClient
  ) { }

  getRequest(url: string) {
    let httpParam = new HttpParams();
    console.log("inside api service: " + url);
    // return this.http.get(url);
  }

  postRequest(testObject) {
    return this.http.post(`${this.redirectorUrl}`, testObject);
  }
}
