import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService) { }
  title = 'front-end';

  checkCookie(user) {
    this.authService.checkCookie().subscribe(cookie => {
      console.log({cookie});
    });
  }
}
