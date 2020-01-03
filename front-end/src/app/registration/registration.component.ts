import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AuthService } from '../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(user) {
    user.dob = moment(new Date(user.dob)).format('YYYY-MM-DD');
    this.authService.register(user).subscribe(res => {
      this.router.navigate(['/login']);
    });
  }

}
