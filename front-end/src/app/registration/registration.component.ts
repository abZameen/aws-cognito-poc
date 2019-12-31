import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AuthService } from '../services/auth.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(user) {
    console.log('before', user.dob);
    user.dob = moment(new Date(user.dob)).format('YYYY-MM-DD');
    console.log('after', user.dob);
    console.log({user});
    this.authService.register(user).subscribe(res => {
      console.log({res});
    }, err => {
    });
  }

}
