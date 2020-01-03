import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  apiURL = 'http://localhost:3001/api';

  constructor(private http: HttpClient) {
  }
  getUsers () {
    return this.http.get(`${this.apiURL}/users`);
  }
}
