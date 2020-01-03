import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

  apiURL = '/auth';

  constructor(private http: HttpClient) {
  }
  register (user) {
    return this.http.post(`${this.apiURL}/register`, user);
  }
  login (credentials) {
    return this.http.post(`${this.apiURL}/login`, credentials, { responseType: 'text' });
  }
  refreshToken () {
    return this.http.get(`${this.apiURL}/refreshToken`);
  }
}
