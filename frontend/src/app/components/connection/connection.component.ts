import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {
  title = 'angularvalidate'
  registerForm: FormGroup;
  submitted=false;
  imageUrl!:string;
  errMsg: any;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(5)]]
    });
  }
  ngOnInit() {
    this.imageUrl='../assets/default-avatar.jpg';
  }

  // Fonction pour la connexion
  loginUser() {
    this.submitted = true;

    if(this.registerForm.invalid){
      return;
  }
    this.authService.signIn(this.registerForm.value).subscribe((res: any) => {
      localStorage.setItem('access_token', res.token);
      this.authService.getUserProfile(res._id).subscribe((res) => {
        this.authService.currentUser = res;
        this.router.navigate(['user-profile']);
      });
    }, // Intercepter les messages d'erreurs du serveur
    error => {
      this.errMsg = error.error.message
      console.log(error.error.message)
    }
    );

  }
}
