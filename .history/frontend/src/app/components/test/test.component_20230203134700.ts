import { Subscriber } from 'rxjs';
import { IotService } from './../../service/iot.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from './../../service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UsernameValidator } from 'src/app/username.validator';
import Swal from 'sweetalert2';
import { MustMatch } from 'src/app/MustMatch';
import { HttpEventType } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { Iot } from 'src/app/models/iot';
import * as _ from 'lodash';



@Component({  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {


  public sidebarShow: boolean = false;

  currentUser: any = {};

  signupForm: FormGroup;
  submitted=false;
  check= false;
  verifPass:any = true;
  preview!: string;
  percentDone?: any = 0;
  errMsg: any;
  show:boolean = false; nbrActifs!:number
  allumer:boolean = false;
  //dataiot: any;
  temperature: any;
  humidite: any;
  affich!:any; // pour recuperer et affciher température et humidité
  eteindre!: boolean;
  historique!: Iot[];
  donne8h!: Iot[];
  donne12h!: Iot[];
  donne19h!: Iot[];
  temps!: any;
  last_week!: string;
  semaine!: Iot[];
  sem8h!: Iot[];
  sem12h!: Iot[];
  filter_sem!: Iot[];
  sem19h!: Iot[];
    Date=new Date();
  date: any;

  dataiot: any;
  currentDate: any;
  tep8: any;
  hm8: any;
  hm12: any;
  hm19: any;
  tep19: any;
  tep12: any;
  moyTemp: any;
  moyHum: any;
  m: any;
  hu: any;



  constructor(public formBuilder: FormBuilder,
              public authService: AuthService,
              private actRoute: ActivatedRoute,
              public router: Router,
              private IotService: IotService
  ) {


    //Recuperer les informations de l'utilisateur
    // let id = this.actRoute.snapshot.paramMap.get('id');
    let id = localStorage.getItem('id')?.replaceAll('"', '');
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

  ngOnInit():void {



  // coté iot
    this.IotService.iot().subscribe((data) => {
/*       console.log(data);
 */      this.affich=data // COTÉ REALTIME
     })

     //calcul de la date et l'heure
     // coté historique de la semaine

 this.date = new Date(); // date
var jour= this.date.getDate(); //renvoie le chiffre du jour du mois
var mois = this.date.getMonth() + 1; //le mois en chiffre
var annee = this.date.getFullYear(); // me renvoie en chiffre l'annee
if (mois < 10) { mois = '0' + mois; } // si le jour est <10 on affiche 0 devant
if (jour < 10) { jour = '0' + jour; } // si le mois est <10 on affiche 0 devant
this.last_week = jour + '/' + mois + '/' + annee;


    this.authService.gethisto().subscribe(data => {
      // affichage de la journée
      this.currentDate = ('0'+new Date().getDate()) + '/' + ('0'+(new Date().getMonth()+1)) + '/'+  new Date().getFullYear();
this.historique=data as unknown as Iot[];
//console.log(this.historique)
this.donne8h= this.historique.filter((h:any)=>h.Heure=='08:00:00' && h.Date==this.currentDate)
/* console.log(this.donne8h)
 */this.donne12h= this.historique.filter((h:any)=>h.Heure=='12:00:00' && h.Date==this.currentDate)
this.donne19h= this.historique.filter((h:any)=>h.Heure=='19:00:00' && h.Date==this.currentDate)

// donnees pour 8h
let tmp8 = this.donne8h;
let b:any =  tmp8;
// console.log(tmp8!);
for (const iterator of b)
      {
        // console.log(iterator.Temperature);
        // console.log(iterator.Humidité);

        this.tep8= iterator.Temperature;
        this.hm8=iterator.Humidite;

      }
      // donnees pour 12h
let tmp12 = this.donne12h;
let c:any =  tmp12;
// console.log(tmp8!);
for (const iterator of c)
      {
        // console.log(iterator.Temperature);
        // console.log(iterator.Humidité);

        this.tep12= iterator.Temperature;
        this.hm12=iterator.Humidite;

      }

          // donnees pour 19h
let tmp19 = this.donne19h;
let d:any =  tmp12;
// console.log(tmp8!);
for (const iterator of d)
      {
        // console.log(iterator.Temperature);
        // console.log(iterator.Humidité);

        this.tep19= iterator.Temperature;
        this.hm19=iterator.Humidite;

      }
// calcul de la moyenne journalière
      this.moyTemp = (parseInt(String(this.tep8)) + parseInt(String(this.tep12))) + parseInt(String(this.tep19)) / 3;
     this.moyHum = (parseInt(String(this.hm8)) + parseInt(String(this.hm12)) + parseInt(String(this.hm19))) / 3;

    this.m= (Math.round(this.moyTemp*100)/100)+0;  this.hu= (Math.round(this.moyHum*100)/100)+0;

      // fin

this.semaine= this.historique.filter((h:any)=>h.Date!=this.last_week)

this.sem8h=this.semaine.filter((s:any)=>s.Heure == '08:00:00');
this.sem12h=this.semaine.filter((s:any)=>s.Heure == '12:00:00')
this.sem19h=this.semaine.filter((s:any)=>s.Heure == '19:00:00')

this.filter_sem=this.semaine
this.filter_sem = _.uniqBy(this.filter_sem, 'Date')


    }

      )


  }

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
  public afficher():void{
    this.show = true
  }

  public afficher1():void{
    this.show = false
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
    } , // Intercepter les messages d'erreurs du serveur
    error => {
      this.errMsg = error.error.error
      console.log(this.errMsg)
    });


    }

    allumerVent(){ // allumage ventilo

      this.allumer ? this.allumer = false: this.allumer = true
      this.IotService.iot1().subscribe((data) => {
        console.log(data)

      })



    }

    eteindreVent(){ // allumage ventilo

      this.eteindre ? this.eteindre = false: this.eteindre = true
      this.IotService.iot2().subscribe((data) => {
        console.log(data)
      })



    }





}
