import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { AuthService } from './../../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: any = {};
  currentDate = new Date();
  showHead = false;
  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute,
    private router:Router
  ) {
    // Recuperer les informations de l'utilisateur
    // let id = this.actRoute.snapshot.paramMap.get('id');
    let id = localStorage.getItem('id')?.replaceAll('"', '');
    this.authService.getUserProfile(id).subscribe((res) => {
      this.currentUser = res.msg;
    });

    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event.url === '/log-in'|| event.url === '/' || event.url === '/') {
          this.showHead = false;
        } else {
          this.showHead = true;

        }
      }
    });
  }


  ngOnInit() { }
  logout() {
    this.authService.doLogout()
  }
}
