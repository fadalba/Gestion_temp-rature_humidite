import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [DatePipe]
})
export class HeaderComponent implements OnInit {
  currentUser: any = {};
  MyDate = new Date();

  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute
  ) {
    // Recuperer les informations de l'utilisateur
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.authService.getUserProfile(id).subscribe((res) => {
      this.currentUser = res.msg;
    });
  }


  ngOnInit() { }
  deconection(){
    this.authService.doLogout();
  }


}
