import { Component, OnInit } from '@angular/core';
import { UserService } from '../services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public result: any;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(res => {
      this.result = res;
    });
  }

}
