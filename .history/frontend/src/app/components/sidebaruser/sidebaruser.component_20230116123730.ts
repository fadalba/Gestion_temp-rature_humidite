
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
  selector: 'app-sidebaruser',
  templateUrl: './sidebaruser.component.html',
  styleUrls: ['./sidebaruser.component.scss']
})
export class SidebaruserComponent {

  public sidebarShow: boolean = false;



  signupForm: FormGroup;
  submitted=false;
  check= false;
  verifPass:any = true;
  preview!: string;
  percentDone?: any = 0;
  errMsg: any;

  constructor(public formBuilder: FormBuilder,
              public authService: AuthService,
              public router: Router
  ) {
    //Crontôle de saisie du formulaire
    this.signupForm = this.formBuilder.group({
        password:['',[Validators.required,Validators.minLength(8)]],
        passwordConfirm: ['', Validators.required],

    },  { validator: MustMatch('password', 'passwordConfirm')}
  )}



  ngOnInit() {}

  // Fonction pour télécharger l'mage
/*   uploadFile(event: any) {

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
  } */

//Fonction pour l'inscription
  /* registerUser() {
    this.submitted = true;
    if(this.signupForm.invalid){
      return;
    }
    this.submitted=false
    //générer matricule pour administrateur et utilisateur
    let matriculeGenerate;
    this.signupForm.value.role =="Administrateur" ? matriculeGenerate= "MAT"+(Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1))
      :matriculeGenerate= "MUT"+(Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1));
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
    } ,  */// Intercepter les messages d'erreurs du serveur
    /* error => {
      this.errMsg = error.error.error
      console.log(this.errMsg)
    }); */
    updatepass(){
      const id =  this.signupForm.value.id;
   const user ={
    password: this.signupForm.value.pass,

   }
   this.submitted = true;
   if(this.signupForm.invalid){
     return;
   }
      this.authService.updatepassword(id, user).subscribe(
        data=>{
          this.ngOnInit();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Modification réussi !',
            showConfirmButton: false,
            timer: 1500
          });window.setTimeout(function(){location.reload()},1000)
        },
        error => {
          this.errMsg = false
          setTimeout(()=>{ this.errMsg = true}, 2000);
        });
    }


    }














