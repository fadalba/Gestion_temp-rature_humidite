import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { NavigationStart, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showHead!:boolean;
  constructor(public authService: AuthService, private router:Router) {
    console.log(router.config);
    const isGoodRoute: boolean = false
    router.config

    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event.url === '/log-in' || event.url === '/') {
          this.showHead = false;
        } else {
          this.showHead = true;

        }
      }
    });
  }
  logout() {
    this.authService.doLogout()
  }
  title = 'frontend';


}

