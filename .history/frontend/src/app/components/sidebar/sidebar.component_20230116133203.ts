// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-sidebar',
//   templateUrl: './sidebar.component.html',
//   styleUrls: ['./sidebar.component.scss']
// })
// export class SidebarComponent {

// }


import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from './../../service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UsernameValidator } from 'src/app/username.validator';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MustMatch } from 'src/app/MustMatch';
import { HttpEventType } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  public sidebarShow: boolean = false;

  currentUser: any = {};

  signupForm: FormGroup;
  submitted=false;
  check= false;
  verifPass:any = true;
  preview!: string;
  percentDone?: any = 0;
  errMsg: any;




  constructor(public formBuilder: FormBuilder,
              public authService: AuthService,
              private actRoute: ActivatedRoute,
              public router: Router
  ) {

    //Recuperer les informations de l'utilisateur
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.authService.getUserProfile(id).subscribe((res) => {
    this.currentUser = res.msg;
    });
    //Crontôle de saisie du formulaire
    this.signupForm = this.formBuilder.group({
        prenom:['',[Validators.required , UsernameValidator.cannotContainSpace]],
        nom:['',[Validators.required , UsernameValidator.cannotContainSpace]],
        email:['',[Validators.required,Validators.email]],
        role:['',Validators.required],
        password:['',[Validators.required,Validators.minLength(8)]],
        passwordConfirm: ['', Validators.required],
        etat:[0, Validators.required],
        imageUrl:[""],
        matricule: ['']
    },  { validator: MustMatch('password', 'passwordConfirm')}
  )}

  listDeroulant=['Administrateur','Utilisateur'];

  ngOnInit() {}

  // Fonction pour télécharger l'mage
  uploadFile(event: any) {

    const file = event.target.files[0];
    this.signupForm.patchValue({
      imageUrl: file,
    });
    this.signupForm.get('imageUrl')?.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

//Fonction pour l'inscription
  registerUser() {
    this.submitted = true;
    if(this.signupForm.invalid){
      return;
    }
    this.submitted=false
    //générer matricule pour administrateur et utilisateur
    let matriculeGenerate;
    this.signupForm.value.role =="Administrateur" ? matriculeGenerate= "MAT"+(Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1))
      :matriculeGenerate= "UTIL"+(Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1));
      this.signupForm.controls.matricule.setValue(matriculeGenerate)

    this.authService.signUp(this.signupForm.value.prenom, this.signupForm.value.nom,
      this.signupForm.value.email, this.signupForm.value.role, this.signupForm.value.password,
      this.signupForm.value.etat,this.signupForm.value.imageUrl,this.signupForm.value.matricule).subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Requete éxecutée!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.Response:
            console.log('User successfully created!', event.body);
            this.percentDone = false;
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Inscription réussi !',
              showConfirmButton: false,
              timer: 1500
            });window.setTimeout(function(){location.reload()},1000)
             break;
        }
    } , // Intercepter les messages d'erreurs du serveur
    error => {
      this.errMsg = error.error.error
      console.log(this.errMsg)
    });


    }


}
