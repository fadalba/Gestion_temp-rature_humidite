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
    let isGoodRoute: boolean = true


    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        router.config.forEach(route => {
          //console.log(route.path);

          if('/'+ route.path ===event.url) {
            isGoodRoute = true;
          }
        })
        if (event.url === '/log-in' || event.url === '/' || !isGoodRoute) {
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

