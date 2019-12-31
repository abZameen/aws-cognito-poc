import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

  apiURL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {
  }
  register (user) {
    console.log("got user", user);
    return this.http.post(`${this.apiURL}/register`, user);
  }
  login (credentials) {
    return this.http.post(`${this.apiURL}/login`, credentials);
  }
}
