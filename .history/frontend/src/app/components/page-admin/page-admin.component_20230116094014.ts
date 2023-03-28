import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-page-admin',
  templateUrl: './page-admin.component.html',
  styleUrls: ['./page-admin.component.scss']
})
export class PageAdminComponent {
  currentUser: any = {};
  updatePass!: FormGroup;
  formPassword: Boolean = false;
  formImage: Boolean = false;
  show:boolean = false

  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
     // Recuperer les informations de l'utilisateur
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.authService.getUserProfile(id).subscribe((res) => {
      this.currentUser = res.msg;
      console.log();

    });
  }
  //Deconnexion
  logout() {
    this.authService.doLogout()
  }
  // Fonctions pour basculer entre le tableau des actifs et celui des archives
  public afficher():void{
    this.show = true
  }

  public afficher1():void{
    this.show = false
  }

  showPassword(){
    return this.formPassword = true;
  }
  hidePassword(){
    return this.formPassword = false;
  }

  showImage(){
    return this.formImage = true;
  }
  hideImage(){
    return this.formImage = false;
  }
}
